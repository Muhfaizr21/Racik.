import { useState } from 'react'
import type { AuthUser } from '../../../types/auth'
import type { AdminTab } from '../types/admin'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { AdminInfoBoxes } from './AdminInfoBoxes'
import { AdminVatTable } from './AdminVatTable'
import { AdminInventoryTable } from './AdminInventoryTable'
import { OwnerDashboard } from '../../owner'
import { useOwnerWorkstation } from '../../owner/hooks/useOwnerWorkstation'

interface AdminLayoutProps {
  currentUser: AuthUser
  onSwitchToLanding: () => void
  onLogout: () => void
}

export function AdminLayout({
  currentUser,
  onSwitchToLanding,
  onLogout
}: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { materials } = useOwnerWorkstation()

  return (
    <div className="min-h-screen bg-[#0E0D0C] text-neutral-100 flex antialiased">
      {/* AdminLTE Sidebar */}
      <AdminSidebar
        currentUser={currentUser}
        activeTab={activeTab}
        isCollapsed={isSidebarCollapsed}
        onSelectTab={setActiveTab}
        onSwitchToLanding={onSwitchToLanding}
        onLogout={onLogout}
      />

      {/* Main Content Wrapper (AdminLTE Content-Wrapper) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Navbar Header */}
        <AdminHeader
          currentUser={currentUser}
          activeTab={activeTab}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onSwitchToLanding={onSwitchToLanding}
          onLogout={onLogout}
        />

        {/* Content Area (AdminLTE Content Body) */}
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Always show Small-Boxes on overview, or render specific tabs */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* AdminLTE Small-Boxes Row */}
              <AdminInfoBoxes onSelectTab={setActiveTab} />

              {/* Master Perfumer Workstation Core Component */}
              <div className="rounded-2xl bg-[#141312] border border-white/10 p-6 md:p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <h2 className="text-lg font-bold text-white font-display">
                      Kubah Formula & Laboratorium Eksekutif
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Akses terpusat perancangan wewangian dan simulasi proyeksi tangki vat.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                    Mode Superadmin
                  </span>
                </div>

                <OwnerDashboard />
              </div>

              {/* Maceration Vat Tank Live Table */}
              <AdminVatTable />

              {/* Raw Materials Inventory Table */}
              <AdminInventoryTable materials={materials} />
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="space-y-6">
              <OwnerDashboard />
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <OwnerDashboard />
            </div>
          )}

          {activeTab === 'maceration_vats' && (
            <div className="space-y-6">
              <AdminVatTable />
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <AdminInventoryTable materials={materials} />
            </div>
          )}

          {activeTab === 'passports' && (
            <div className="rounded-2xl bg-[#161514] border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Audit Sertifikat Digital Scent Passport
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Pelacakan kode hash QR dan NFC tag botol yang terdaftar di database PostgreSQL.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  1,840 Botol Terverifikasi
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1918] border border-white/5 font-mono text-xs space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Sample QR Hash:</span>
                  <span className="text-[#D4AF37]">2609-EDP-042</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Varian Parfum:</span>
                  <span className="text-white">Santal Royale Extrait (50ml)</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Nomor Seri Botol:</span>
                  <span className="text-white">042/200 &bull; Lot: LOT-202609-SNT-01</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Status Keaslian:</span>
                  <span className="text-emerald-400 font-bold">TERVERIFIKASI ASLI (PostgreSQL)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="rounded-2xl bg-[#161514] border border-white/10 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-white/10 bg-[#1A1918]">
                <h3 className="text-sm font-bold text-white">Manajemen Akun Staf & Hak Akses (PostgreSQL users)</h3>
                <p className="text-[11px] text-neutral-400">Daftar pengguna dengan role masing-masing di database.</p>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-[#121110] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-4">Nama Lengkap</th>
                      <th className="py-2.5 px-4">Email</th>
                      <th className="py-2.5 px-4">Role Sistem</th>
                      <th className="py-2.5 px-4">Outlet / Lokasi</th>
                      <th className="py-2.5 px-4 text-right">Status Sesi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">Faiz Ramadhan (Master Perfumer)</td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">owner@racik.id</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                          OWNER
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400">Headquarters Lab</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-medium">Aktif Sekarang</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">Budi Santoso (Lab Technician)</td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">lab@racik.id</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          LAB_TECH
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400">Maceration Room 1</td>
                      <td className="py-3 px-4 text-right text-neutral-400">Standby</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">Siti Rahma (Kepala Gudang)</td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">warehouse@racik.id</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          WAREHOUSE
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400">Central Warehouse</td>
                      <td className="py-3 px-4 text-right text-neutral-400">Standby</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">Dewi Lestari (Kasir Butik)</td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">cashier@racik.id</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          CASHIER
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400">Flagship Senopati 01</td>
                      <td className="py-3 px-4 text-right text-neutral-400">Standby</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="rounded-2xl bg-[#161514] border border-white/10 p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-display">
                Konfigurasi Database & Server Golang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#1A1918] border border-white/5 space-y-2">
                  <div className="text-neutral-400 font-sans font-bold uppercase text-[10px]">Database PostgreSQL:</div>
                  <div>Host: <span className="text-white">localhost</span></div>
                  <div>Port: <span className="text-white">5432</span></div>
                  <div>Database: <span className="text-[#D4AF37] font-bold">racik</span></div>
                  <div>Username: <span className="text-white">muhfaiizr</span></div>
                  <div>Status: <span className="text-emerald-400">CONNECTED & HEALTHY</span></div>
                </div>

                <div className="p-4 rounded-xl bg-[#1A1918] border border-white/5 space-y-2">
                  <div className="text-neutral-400 font-sans font-bold uppercase text-[10px]">Server Backend Golang:</div>
                  <div>Port: <span className="text-white">8080</span></div>
                  <div>Framework: <span className="text-white">Gin Gonic (MVC)</span></div>
                  <div>ORM: <span className="text-white">GORM v2</span></div>
                  <div>Mode: <span className="text-[#D4AF37]">Development / Production-Ready</span></div>
                  <div>Health: <span className="text-emerald-400">UP (200 OK)</span></div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* AdminLTE Footer */}
        <footer className="h-14 bg-[#121110] border-t border-white/10 px-6 flex items-center justify-between text-xs text-neutral-400 shrink-0">
          <div>
            <strong className="text-neutral-200">Copyright &copy; 2026 Racik Parfumerie OS.</strong> Hak Cipta Dilindungi.
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span>Database: PostgreSQL <code className="text-neutral-200">racik</code></span>
            <span>&bull;</span>
            <span className="font-mono text-[11px] text-[#D4AF37]">AdminLTE Enterprise v2.4</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
