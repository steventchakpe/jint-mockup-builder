// ── Bouton flottant Toggle Preview ───────────────────────────────────────────
import { Eye, EyeOff, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useMockupStore } from '../store'

export default function PreviewToggle() {
  const { isPreviewMode, togglePreviewMode } = useMockupStore()

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={togglePreviewMode}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg hover:bg-gray-50 transition-all"
        style={{ color: isPreviewMode ? '#323130' : 'var(--brand-color)' }}
      >
        {isPreviewMode ? (
          <>
            <PanelLeftOpen className="w-4 h-4" />
            Mode Édition
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            Aperçu client
          </>
        )}
      </button>
    </div>
  )
}
