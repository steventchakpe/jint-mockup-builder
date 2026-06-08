# Authentification & accès — Spécifications

> Décisions Steven (2026-06-08). ⚠️ Ceci **modifie le PRD** qui indiquait « Pas
> d'authentification » (§7 Auth). On introduit deux systèmes d'accès distincts.
> Voir aussi : [ANALYTICS.md](./ANALYTICS.md) (le tracking ne concerne que /view).

---

## 1. Deux systèmes d'accès distincts

| Périmètre | Qui | Mécanisme |
|-----------|-----|-----------|
| **Interne** | Équipe Jint (`@jint.co`) | **SSO Microsoft** (Entra ID, single-tenant) |
| **Prospect** | Destinataire d'un lien partagé | **Lien public temporaire** (expiration + révocation) |

---

## 2. SSO interne — Microsoft Entra ID

### 2.1 Décisions
- **Single-tenant `jint.co`** : l'app est rattachée au seul tenant Entra de Jint.
  Microsoft refuse tout compte d'un autre tenant.
- **Double verrou** : en plus du single-tenant, vérification côté app que l'email se
  termine par `@jint.co` (bloque les invités/guests éventuels du tenant).
- **Librairie** : Auth.js (NextAuth) + provider « Microsoft Entra ID ». Pas de service
  d'auth facturé par utilisateur (on évite Entra External ID / Auth0 → coût nul).

### 2.2 Flow
1. Utilisateur clique « Se connecter avec Microsoft ».
2. Redirection Entra → authentification (compte `@jint.co` + MFA Jint existant).
3. Token OIDC signé → session cookie créée.
4. Middleware vérifie domaine `@jint.co` → accès débloqué.

### 2.3 Routes protégées vs publiques
**Protégées (SSO requis)** :
- `/` (dashboard), `/edit/{id}`, `/preview/{id}`, page profils/annuaire
- APIs d'écriture (`/api/projects/*`, upload images, déclaration template…)

**Publiques (JAMAIS de SSO)** — sinon le prospect ne peut pas ouvrir la démo :
- `/view/{share-token}`
- APIs de tracking analytics (émises depuis /view)

### 2.4 Prérequis côté Jint (IT/admin)
- **App registration** dans le tenant Entra `jint.co` → `AZURE_AD_CLIENT_ID`,
  `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`.
- Redirect URI de l'app (`/api/auth/callback/microsoft-entra-id`).

---

## 3. Accès prospect — lien public temporaire

### 3.1 Décision (anti-fuite concurrence, faible friction)
Chaque lien partagé est **public mais temporaire** :
- **Expiration** configurable au partage (ex. 7 / 14 / 30 jours).
- **Révocable** à tout moment depuis le dashboard.
- Pas de login, pas de compte, pas d'email à saisir côté prospect → friction nulle.
- Anti-fuite = **fenêtre d'exposition limitée** + révocation immédiate si besoin.

### 3.2 Modèle de données (extension `metadata` / share)
```ts
interface ShareLink {
  token: string;          // share-token (≠ project-id)
  createdAt: string;      // ISO
  expiresAt: string | null;  // ISO — null = pas d'expiration (à éviter par défaut)
  revoked: boolean;       // révocation manuelle
}
```
- À l'accès `/view/{token}` : si `revoked` ou `now > expiresAt` → page friendly
  « Ce lien a expiré » + (pas de fuite de contenu). Cohérent avec la gestion d'erreurs PRD §7.2.
- UI partage : sélecteur de durée d'expiration + bouton « Révoquer » sur la carte dashboard.

### 3.3 Tracking
Inchangé : le tracking analytics (ANALYTICS.md) s'émet depuis `/view`, lien valide uniquement.

---

## 4. Extensions futures (notées, non implémentées)

- **Lien restreint par email + OTP** : pour un prospect ultra-sensible, le Sales saisit
  1+ emails autorisés ; le prospect prouve la possession via **code OTP par email**
  (universel, marche avec toute messagerie). **Coût faible** : génération/vérif triviale,
  seul coût = email transactionnel (Azure Communication Services / SES / Resend ≈ centimes,
  quasi gratuit au volume Jint). À implémenter seulement si le besoin se confirme.
  > ❌ SSO Microsoft côté prospect écarté : ne couvre que les prospects sur Microsoft 365,
  > exclut Google Workspace & autres.
- **Partenaires intégrateurs** (persona PRD) : connexion à gérer plus tard (autres domaines
  / invités). MVP = `@jint.co` strict. Prévoir une liste d'autorisation de domaines extensible.

---

## 5. Impact PRD

Le PRD §7 (« Pas d'authentification. Mode Édition accessible via `/edit/{id}` ») est
**remplacé** par ce doc :
- Édition/dashboard désormais **derrière SSO Microsoft `@jint.co`**.
- Liens partagés = **publics temporaires** (avec expiration/révocation) au lieu de publics permanents.
