import { ScentStudio } from '../components/ScentStudio'
import type { AppRoute } from '../hooks/useRoute'

interface StudioPageProps {
  onNavigate: (route: AppRoute, param?: string) => void
}

export function StudioPage({ onNavigate }: StudioPageProps) {
  return (
    <div className="pt-24 pb-20 bg-[#131211] min-h-screen text-neutral-100">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pb-4 border-b border-white/[0.08]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <span>/</span>
          <span className="text-[#D4AF37] font-semibold">Studio Formulasi & Lab Peracik</span>
        </div>
      </div>

      <ScentStudio />
    </div>
  )
}
