import { AdminLayout } from '../features/admin'
import { LoginSection } from '../components/LoginSection'
import type { AuthUser } from '../types/auth'
import type { AppRoute } from '../hooks/useRoute'

interface AdminPageProps {
  currentUser: AuthUser | null
  onNavigate: (route: AppRoute, param?: string) => void
  onOpenLogin: () => void
  onLogout: () => void
}

export function AdminPage({ currentUser, onNavigate, onOpenLogin, onLogout }: AdminPageProps) {
  if (currentUser) {
    return (
      <AdminLayout
        currentUser={currentUser}
        onSwitchToLanding={() => onNavigate('home')}
        onLogout={onLogout}
      />
    )
  }

  return (
    <div className="pt-24 pb-20 bg-[#131211] min-h-screen text-neutral-100">
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
          <span className="text-[#D4AF37] font-semibold">Portal Superadmin & Role Workstation</span>
        </div>
      </div>

      <LoginSection
        currentUser={currentUser}
        onOpenLogin={onOpenLogin}
      />
    </div>
  )
}
