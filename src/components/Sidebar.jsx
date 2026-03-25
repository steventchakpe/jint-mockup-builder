// ── Sidebar Editor ────────────────────────────────────────────────────────────
// Sections :
//   1. Logo Jint + tagline
//   2. Informations client (nom, couleur accent, couleur header)
//   3. Webparts actifs (checkboxes groupées par catégorie)
//   4. Actions (Aperçu, Tout activer, Tout désactiver)

import { useMockupStore, WEBPARTS } from '../store'
import { Eye, CheckSquare, Square, RefreshCcw, Palette, Type, Layers } from 'lucide-react'

// ── Groupement des webparts par catégorie ─────────────────────────────────────
const grouped = WEBPARTS.reduce((acc, wp) => {
  if (!acc[wp.category]) acc[wp.category] = []
  acc[wp.category].push(wp)
  return acc
}, {})

// ── ColorInput avec preview swatch ────────────────────────────────────────────
function ColorInput({ label, value, onChange, helpText }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#323130] uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-2 border border-[#d2d0ce] rounded-[4px] px-2 py-1.5 bg-white hover:border-[#605e5c] transition-colors">
        {/* Native color picker – triggers the OS color swatch */}
        <div className="relative shrink-0">
          <div
            className="w-6 h-6 rounded-[3px] border border-[#d2d0ce] cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        {/* Hex value display */}
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
          }}
          className="flex-1 min-w-0 text-[13px] font-mono text-[#323130] bg-transparent outline-none"
          maxLength={7}
        />
      </div>
      {helpText && <p className="text-[11px] text-[#605e5c]">{helpText}</p>}
    </div>
  )
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function WebpartCheckbox({ webpart, enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 w-full text-left rounded-[4px] px-2 py-1.5 transition-colors ${
        enabled ? 'hover:bg-[#f3f2f1]' : 'hover:bg-[#f3f2f1] opacity-60'
      }`}
    >
      <div
        className="shrink-0 w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors"
        style={{
          backgroundColor: enabled ? 'var(--brand-color)' : 'white',
          borderColor: enabled ? 'var(--brand-color)' : '#d2d0ce',
        }}
      >
        {enabled && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span className="text-[13px] text-[#323130] leading-[18px] truncate">{webpart.label}</span>
    </button>
  )
}

// ── Divider ────────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t border-[#edebe9] mx-0 my-0" />
}

// ── Section header ─────────────────────────────────────────────────────────────
function SidebarSection({ title, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-[#605e5c] shrink-0" />
        <span className="text-[11px] font-bold text-[#605e5c] uppercase tracking-wider">{title}</span>
      </div>
      {children}
    </div>
  )
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar() {
  const {
    clientName, setClientName,
    primaryColor, setPrimaryColor,
    headerColor, setHeaderColor,
    webparts, toggleWebpart,
    enableAll, disableAll,
    isPreviewMode, togglePreviewMode,
  } = useMockupStore()

  const enabledCount = Object.values(webparts).filter(Boolean).length

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>

      {/* ── Logo Jint ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#edebe9]">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-white font-bold text-[16px] shrink-0"
          style={{ backgroundColor: 'var(--brand-color)' }}
        >
          J
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[14px] font-bold text-[#323130] leading-[18px]">Jint</span>
          <span className="text-[11px] text-[#605e5c] leading-[14px]">Intranet Mockup Builder</span>
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-y-auto">

        {/* Section : Client */}
        <SidebarSection title="Configuration client" icon={Type}>
          <div className="flex flex-col gap-3">
            {/* Client name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#323130] uppercase tracking-wide">
                Nom du client
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="ex: Contoso, TotalEnergies…"
                className="border border-[#d2d0ce] rounded-[4px] px-3 py-1.5 text-[13px] text-[#323130] bg-white outline-none focus:border-[--brand-color] transition-colors placeholder-[#a19f9d]"
                style={{ '--brand-color-focus': 'var(--brand-color)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--brand-color)'}
                onBlur={(e)  => e.target.style.borderColor = '#d2d0ce'}
              />
            </div>
          </div>
        </SidebarSection>

        <Divider />

        {/* Section : Colors */}
        <SidebarSection title="Identité visuelle" icon={Palette}>
          <div className="flex flex-col gap-3">
            <ColorInput
              label="Couleur d'accent"
              value={primaryColor}
              onChange={setPrimaryColor}
              helpText="BrandBackground · kickers, logos, nav actif"
            />
            <ColorInput
              label="Couleur header"
              value={headerColor}
              onChange={setHeaderColor}
              helpText="Suite Header SharePoint"
            />
          </div>

          {/* Live preview swatches */}
          <div className="flex gap-2 mt-1">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-6 rounded-[3px]" style={{ backgroundColor: primaryColor }} />
              <span className="text-[10px] text-[#605e5c]">Accent</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-6 rounded-[3px]" style={{ backgroundColor: headerColor }} />
              <span className="text-[10px] text-[#605e5c]">Header</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-6 rounded-[3px] border border-[#e1dfdd]" style={{ backgroundColor: primaryColor + '33' }} />
              <span className="text-[10px] text-[#605e5c]">Light</span>
            </div>
          </div>
        </SidebarSection>

        <Divider />

        {/* Section : Webparts */}
        <SidebarSection title={`Webparts (${enabledCount}/${WEBPARTS.length})`} icon={Layers}>
          {/* Bulk actions */}
          <div className="flex gap-2 mb-1">
            <button
              onClick={enableAll}
              className="flex-1 text-[11px] font-semibold py-1 px-2 rounded-[4px] border border-[#d2d0ce] text-[#323130] hover:bg-[#f3f2f1] transition-colors"
            >
              Tout activer
            </button>
            <button
              onClick={disableAll}
              className="flex-1 text-[11px] font-semibold py-1 px-2 rounded-[4px] border border-[#d2d0ce] text-[#323130] hover:bg-[#f3f2f1] transition-colors"
            >
              Tout désactiver
            </button>
          </div>

          {/* Grouped checkboxes */}
          {Object.entries(grouped).map(([category, wps]) => (
            <div key={category} className="flex flex-col gap-0.5">
              <p className="text-[11px] font-semibold text-[#605e5c] px-2 pt-1 pb-0.5 uppercase tracking-wide">
                {category}
              </p>
              {wps.map((wp) => (
                <WebpartCheckbox
                  key={wp.id}
                  webpart={wp}
                  enabled={!!webparts[wp.id]}
                  onToggle={() => toggleWebpart(wp.id)}
                />
              ))}
            </div>
          ))}
        </SidebarSection>

        <Divider />

        {/* Spacer */}
        <div className="flex-1" />
      </div>

      {/* ── Footer actions ─────────────────────────────────────────────── */}
      <div className="border-t border-[#edebe9] p-4">
        <button
          onClick={togglePreviewMode}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[4px] text-white text-[14px] font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--brand-color)' }}
        >
          <Eye className="w-4 h-4" />
          {isPreviewMode ? 'Retour à l\'édition' : 'Aperçu plein écran'}
        </button>
        <p className="text-center text-[11px] text-[#a19f9d] mt-2">
          Jint – Intranet Mockup Builder v1.0
        </p>
      </div>
    </div>
  )
}
