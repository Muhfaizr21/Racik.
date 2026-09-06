import type { AuthUser } from '../../../types/auth'
import type { AdminTab } from '../types/admin'
import { Logo } from '../../../components/Logo'

interface AdminSidebarProps {
  currentUser: AuthUser
  activeTab: AdminTab
  isCollapsed: boolean
  onSelectTab: (tab: AdminTab) => void
  onSwitchToLanding: () => void
  onLogout: () => void
}

export function AdminSidebar({
  currentUser,
  activeTab,
  isCollapsed,
  onSelectTab,
  onSwitchToLanding,
  onLogout
}: AdminSidebarProps) {
  const menuItems = [
    {
      category: 'MANAJEMEN INTI',
      items: [
        {
          id: 'overview' as AdminTab,
          label: 'Dashboard Superadmin',
          icon: '📊',
          badge: 'Live',
          badgeColor: 'bg-[#D4AF37]/20 text-[#D4AF37]'
        },
        {
          id: 'formulas' as AdminTab,
          label: 'Kubah Formula Master',
          icon: '🧪',
          badge: '24',
          badgeColor: 'bg-neutral-800 text-neutral-300'
        },
        {
          id: 'calculator' as AdminTab,
          label: 'Kalkulator Batch & SG',
          icon: '⚖️'
        }
      ]
    },
    {
      category: 'PRODUKSI & OPERASIONAL',
      items: [
        {
          id: 'maceration_vats' as AdminTab,
          label: 'Tangki Maserasi Vat',
          icon: '🛢️',
          badge: '8 Vat',
          badgeColor: 'bg-emerald-500/20 text-emerald-300'
        },
        {
          id: 'inventory' as AdminTab,
          label: 'Inventori Bahan & COA',
          icon: '📦',
          badge: '3 Kritis',
          badgeColor: 'bg-amber-500/20 text-amber-300'
        },
        {
          id: 'passports' as AdminTab,
          label: 'Digital Scent Passport',
          icon: '🏷️',
          badge: '1.8k Valid',
          badgeColor: 'bg-sky-500/20 text-sky-300'
        }
      ]
    },
    {
      category: 'SISTEM & AKUN',
      items: [
        {
          id: 'users' as AdminTab,
          label: 'Manajemen Hak Akses',
          icon: '👥',
          badge: '4 Role',
          badgeColor: 'bg-purple-500/20 text-purple-300'
        },
        {
          id: 'settings' as AdminTab,
          label: 'Konfigurasi PostgreSQL',
          icon: '🗄️'
        }
      ]
    }
  ]

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#121110] border-r border-white/10 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header (AdminLTE Brand Logo) */}
      <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between bg-[#0E0D0C] shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <Logo size="sm" />
          {!isCollapsed && (
            <div className="leading-tight">
              <span className="font-bold text-white tracking-wide font-display text-sm block">
                Racik<span className="text-[#D4AF37]">OS</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono block">Enterprise v2.4</span>
            </div>
          )}
        </div>
      </div>

      {/* User Panel (AdminLTE User Panel) */}
      <div className="p-4 border-b border-white/10 bg-[#151413]/60 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-lg shrink-0 shadow-sm">
            👑
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                <span className="text-[11px] text-[#D4AF37] font-semibold">{currentUser.role}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu (AdminLTE Sidebar Menu) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {menuItems.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-2">
                {group.category}
              </div>
            )}

            {group.items.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  title={item.label}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-base shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-neutral-950/20 text-neutral-950' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Bottom Footer Actions (AdminLTE Bottom Bar) */}
      <div className="p-3 border-t border-white/10 bg-[#0E0D0C] space-y-2 shrink-0">
        <button
          type="button"
          onClick={onSwitchToLanding}
          className="w-full px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          title="Lihat Website Publik"
        >
          <span>🌐</span>
          {!isCollapsed && <span>Halaman Publik</span>}
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          title="Keluar / Logout"
        >
          <span>🚪</span>
          {!isCollapsed && <span>Keluar Sistem</span>}
        </button>
      </div>
    </aside>
  )
}
