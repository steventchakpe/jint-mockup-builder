'use client';

import { AccountSwitcher } from './AccountSwitcher';

/**
 * Suite header (barre M365) — reconstruit responsive depuis Figma (axe « Size »).
 * Breakpoints :
 *  - ≥1024 : Waffle + Tenant + « SharePoint » · search 468 · Notif/Settings/Help/Avatar
 *  - 640–1023 : sans Tenant · search 304 · Notif/More/Avatar
 *  - 480–639 : icône Search (plus de champ) · Notif/More/Avatar
 *  - <480 : Waffle seul · Search/Notif/More/Avatar
 * Fond = themePrimary (re-thémable), sticky top.
 */

const ICON_BTN = 'w-12 h-12 flex items-center justify-center hover:bg-white/10 shrink-0';

function Waffle() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.25 18C19.25 18.6904 18.6904 19.25 18 19.25C17.3096 19.25 16.75 18.6904 16.75 18C16.75 17.3096 17.3096 16.75 18 16.75C18.6904 16.75 19.25 17.3096 19.25 18ZM31.25 30C31.25 30.6904 30.6904 31.25 30 31.25C29.3096 31.25 28.75 30.6904 28.75 30C28.75 29.3096 29.3096 28.75 30 28.75C30.6904 28.75 31.25 29.3096 31.25 30ZM30 25.25C30.6904 25.25 31.25 24.6904 31.25 24C31.25 23.3096 30.6904 22.75 30 22.75C29.3096 22.75 28.75 23.3096 28.75 24C28.75 24.6904 29.3096 25.25 30 25.25ZM31.25 18C31.25 18.6904 30.6904 19.25 30 19.25C29.3096 19.25 28.75 18.6904 28.75 18C28.75 17.3096 29.3096 16.75 30 16.75C30.6904 16.75 31.25 17.3096 31.25 18ZM24 31.25C24.6904 31.25 25.25 30.6904 25.25 30C25.25 29.3096 24.6904 28.75 24 28.75C23.3096 28.75 22.75 29.3096 22.75 30C22.75 30.6904 23.3096 31.25 24 31.25ZM25.25 24C25.25 24.6904 24.6904 25.25 24 25.25C23.3096 25.25 22.75 24.6904 22.75 24C22.75 23.3096 23.3096 22.75 24 22.75C24.6904 22.75 25.25 23.3096 25.25 24ZM24 19.25C24.6904 19.25 25.25 18.6904 25.25 18C25.25 17.3096 24.6904 16.75 24 16.75C23.3096 16.75 22.75 17.3096 22.75 18C22.75 18.6904 23.3096 19.25 24 19.25ZM19.25 30C19.25 30.6904 18.6904 31.25 18 31.25C17.3096 31.25 16.75 30.6904 16.75 30C16.75 29.3096 17.3096 28.75 18 28.75C18.6904 28.75 19.25 29.3096 19.25 30ZM18 25.25C18.6904 25.25 19.25 24.6904 19.25 24C19.25 23.3096 18.6904 22.75 18 22.75C17.3096 22.75 16.75 23.3096 16.75 24C16.75 24.6904 17.3096 25.25 18 25.25Z" fill="white" />
    </svg>
  );
}
function SearchGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
      <path d="M9.5 8.5L12.5 11.5M6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6C10 8.20914 8.20914 10 6 10Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function Megaphone() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 18.8016C32 17.8161 31.0658 17.0983 30.1135 17.3522L17.1135 20.8189C16.4569 20.994 16 21.5887 16 22.2683V24.7792C16 25.4249 16.4131 25.9981 17.0257 26.2023L19 26.8604V27.75C19 29.5449 20.4551 31 22.25 31C23.6211 31 24.7932 30.1513 25.2709 28.9507L30.0257 30.5356C30.997 30.8594 32 30.1364 32 29.1126V18.8016ZM24.32 28.6337C23.9766 29.437 23.1787 30 22.25 30C21.0074 30 20 28.9926 20 27.75V27.1937L24.32 28.6337ZM30.3712 18.3185C30.6886 18.2338 31 18.4731 31 18.8016V29.1126C31 29.4538 30.6657 29.6948 30.3419 29.5869L17.3419 25.2536C17.1377 25.1855 17 24.9944 17 24.7792V22.2683C17 22.0417 17.1523 21.8435 17.3712 21.7852L30.3712 18.3185Z" fill="white" />
    </svg>
  );
}
function Settings() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9107 21.3827C16.28 20.2405 16.8884 19.1921 17.6911 18.3036C17.8268 18.1534 18.0398 18.0998 18.2304 18.168L20.1487 18.8539C20.6688 19.0398 21.2411 18.7688 21.4269 18.2488C21.4452 18.1976 21.4593 18.1451 21.469 18.0917L21.8345 16.0857C21.8708 15.8863 22.024 15.7285 22.2223 15.6863C22.8025 15.5628 23.3973 15.5 24 15.5C24.6023 15.5 25.1968 15.5627 25.7767 15.6861C25.9749 15.7282 26.1281 15.8859 26.1645 16.0853L26.531 18.0916C26.6301 18.635 27.1509 18.9951 27.6942 18.896C27.7476 18.8863 27.8002 18.8722 27.8512 18.8539L29.7696 18.168C29.9602 18.0998 30.1732 18.1534 30.3089 18.3036C31.1116 19.1921 31.72 20.2405 32.0893 21.3827C32.1516 21.5753 32.0915 21.7866 31.9371 21.9176L30.3823 23.2377C29.9613 23.5952 29.9098 24.2263 30.2673 24.6473C30.3024 24.6887 30.3409 24.7271 30.3823 24.7623L31.9371 26.0824C32.0915 26.2134 32.1516 26.4247 32.0893 26.6173C31.72 27.7595 31.1116 28.8079 30.3089 29.6964C30.1732 29.8466 29.9602 29.9002 29.7696 29.832L27.8513 29.1461C27.3312 28.9602 26.759 29.2312 26.5731 29.7512C26.5548 29.8024 26.5408 29.8549 26.531 29.9085L26.1645 31.9147C26.1281 32.1141 25.9749 32.2718 25.7767 32.3139C25.1968 32.4373 24.6023 32.5 24 32.5C23.3973 32.5 22.8025 32.4372 22.2223 32.3137C22.024 32.2715 21.8708 32.1137 21.8345 31.9143L21.469 29.9084C21.3699 29.365 20.8492 29.0049 20.3058 29.104C20.2524 29.1137 20.1999 29.1278 20.1488 29.1461L18.2304 29.832C18.0398 29.9002 17.8268 29.8466 17.6911 29.6964C16.8884 28.8079 16.28 27.7595 15.9107 26.6173C15.8484 26.4247 15.9085 26.2134 16.0629 26.0824L17.6177 24.7623C18.0387 24.4048 18.0902 23.7737 17.7327 23.3527C17.6976 23.3113 17.6591 23.2729 17.6178 23.2377L16.0629 21.9176C15.9085 21.7866 15.8484 21.5753 15.9107 21.3827ZM21.5 24C21.5 22.6193 22.6193 21.5 24 21.5C25.3807 21.5 26.5 22.6193 26.5 24C26.5 25.3807 25.3807 26.5 24 26.5C22.6193 26.5 21.5 25.3807 21.5 24Z" fill="white" />
    </svg>
  );
}
function Help() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 17C21.7939 17 20 18.7939 20 21C20 21.2761 20.2239 21.5 20.5 21.5C20.7761 21.5 21 21.2761 21 21C21 19.3461 22.3461 18 24 18C25.6539 18 27 19.3461 27 21C27 22.2486 26.3078 22.8633 25.4246 23.6204L25.3935 23.647C24.5328 24.3845 23.5 25.2695 23.5 27V27.5C23.5 27.7761 23.7239 28 24 28C24.2761 28 24.5 27.7761 24.5 27.5V27C24.5 25.7514 25.1922 25.1367 26.0754 24.3796L26.1065 24.353C26.9672 23.6155 28 22.7305 28 21C28 18.7939 26.2061 17 24 17ZM24 31C24.4142 31 24.75 30.6642 24.75 30.25C24.75 29.8358 24.4142 29.5 24 29.5C23.5858 29.5 23.25 29.8358 23.25 30.25C23.25 30.6642 23.5858 31 24 31Z" fill="white" />
    </svg>
  );
}
function MoreHorizontal() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
  );
}

export interface SuiteHeaderProps {
  tenantLogoText?: string;
  appName?: string;
  searchPlaceholder?: string;
  avatarInitials?: string;
}

export function SuiteHeader({
  tenantLogoText = 'Tenant Logo',
  appName = 'SharePoint',
  searchPlaceholder = 'Search this site',
  avatarInitials = 'JD',
}: SuiteHeaderProps) {
  return (
    <header className="h-12 bg-sp-primary flex items-center shrink-0 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center shrink-0">
        <button className={ICON_BTN} aria-label="Applications"><Waffle /></button>
        <div className="flex items-center gap-sm pr-sm">
          {/* Tenant logo — ≥1024 */}
          <div className="hidden lg:flex bg-[#107c10] px-xs py-2xs">
            <span className="text-white text-caption font-bold uppercase tracking-wide">{tenantLogoText}</span>
          </div>
          {/* App name — ≥480 */}
          <span className="hidden min-[480px]:block text-white font-semibold" style={{ fontSize: '15px' }}>{appName}</span>
        </div>
      </div>

      {/* Center — search (≥640) */}
      <div className="flex-1 flex justify-center px-lg">
        <div className="hidden sm:flex w-full max-w-[304px] lg:max-w-[468px] h-8 bg-white/10 border border-white/30 items-center gap-sm px-sm">
          <SearchGlyph />
          <span className="text-white/70 text-body truncate">{searchPlaceholder}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center shrink-0">
        {/* Search icon — <640 */}
        <button className={`${ICON_BTN} sm:hidden`} aria-label="Rechercher"><SearchGlyph /></button>
        <button className={ICON_BTN} aria-label="Notifications"><Megaphone /></button>
        {/* Settings + Help — ≥1024 */}
        <button className={`${ICON_BTN} hidden lg:flex`} aria-label="Paramètres"><Settings /></button>
        <button className={`${ICON_BTN} hidden lg:flex`} aria-label="Aide"><Help /></button>
        {/* More — <1024 */}
        <button className={`${ICON_BTN} flex lg:hidden`} aria-label="Plus"><MoreHorizontal /></button>
        {/* Avatar — always (profil actif + switch de compte, US-28) */}
        <div className="relative">
          <AccountSwitcher />
        </div>
      </div>
    </header>
  );
}
