import { useState } from 'react'
import type { AuthUser } from '../../../types/auth'
import type { AdminTab } from '../types/admin'

interface AdminHeaderProps {
  currentUser: AuthUser
  activeTab: AdminTab
  isSidebarCollapsed: boolean
  onToggleSidebar: () => void
  onSwitchToLanding: () => void
  onLogout: () => void
}

export function AdminHeader({
  currentUser,
  activeTab,
  isSidebarCollapsed,
  onToggleSidebar,
  onSwitchToLanding,
  onLogout
}: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const notifications = [
    { id: '1', title: 'Tangki VAT-04 mencapai hari ke-18 maserasi', time: '10m lalu', type: 'info' },
    { id: '2', title: 'Stok Assam Oud CO2 tersisa di bawah 1.000g', time: '1j lalu', type: 'warning' },
    { id: '3', title: '14 Botol terverifikasi scan Digital Scent Passport', time: '3j lalu', type: 'success' }
  ]

  const tabTitles: Record<AdminTab, string> = {
    overview: 'Dashboard Eksekutif & Ringkasan Lab',
    formulas: 'Kubah Formula Master & Olfactory Pyramid',
    calculator: 'Kalkulator Proyeksi Batch & Konversi SG',
    maceration_vats: 'Pemantauan Tangki Vat Maserasi',
    inventory: 'Inventori Bahan Baku & Sertifikat COA',
    passports: 'Audit Digital Scent Passport Anti-Fake',
    users: 'Manajemen Hak Akses & Role Staf',
    settings: 'Konfigurasi PostgreSQL & Server'
  }

  return (
    <header className="h-16 bg-[#161514] border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left Area: PushMenu Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="w-9 h-9 rounded-xl border border-white/10 hover:border-[#D4AF37] hover:bg-white/5 flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer"
          title={isSidebarCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'}
          aria-label="Toggle sidebar menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <span>Racik OS</span>
            <span>/</span>
            <span className="text-[#D4AF37] font-semibold">{currentUser.role}</span>
            <span>/</span>
            <span className="text-white capitalize">{activeTab}</span>
          </div>
          <h1 className="text-sm font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
            {tabTitles[activeTab]}
          </h1>
        </div>
      </div>

      {/* Right Area: System Status, Landing Switch, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* PostgreSQL Active Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PostgreSQL: racik (5432)</span>
        </div>

        {/* View Public Website */}
        <button
          type="button"
          onClick={onSwitchToLanding}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#D4AF37] text-neutral-300 hover:text-[#D4AF37] text-xs font-medium transition-colors cursor-pointer"
          title="Buka Website Ritel"
        >
          <span>🌐</span>
          <span>Website Publik</span>
        </button>

        {/* Notification Bell Dropdown (AdminLTE Notifications) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfileMenu(false)
            }}
            className="w-9 h-9 rounded-xl border border-white/10 hover:bg-white/5 flex items-center justify-center text-neutral-300 hover:text-[#D4AF37] relative transition-colors cursor-pointer"
            aria-label="Notifikasi sistem"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 font-bold text-[10px] flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#1C1B19] border border-white/10 shadow-2xl p-4 space-y-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifikasi Produksi</span>
                <span className="text-[10px] text-[#D4AF37]">3 baru</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-[#151413] border border-white/5 text-xs">
                    <div className="font-medium text-neutral-200">{n.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown (AdminLTE User Menu) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setShowNotifications(false)
            }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[#1A1918] border border-white/10 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-xs flex items-center justify-center text-white font-bold">
              👑
            </div>
            <span className="text-xs font-semibold text-neutral-200 hidden sm:block truncate max-w-[120px]">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#1C1B19] border border-white/10 shadow-2xl p-4 space-y-4 z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-lg">
                  👑
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-neutral-400 truncate">{currentUser.email}</div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] inline-block mt-1">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={onSwitchToLanding}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <span>🌐</span>
                  <span>Kembali ke Website Ritel</span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>🚪</span>
                  <span>Keluar dari Superadmin</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
