import type { AdminTab } from '../types/admin'

interface AdminInfoBoxesProps {
  onSelectTab: (tab: AdminTab) => void
}

export function AdminInfoBoxes({ onSelectTab }: AdminInfoBoxesProps) {
  const boxes = [
    {
      id: 'formulas' as AdminTab,
      value: '24 Arsip',
      label: 'Kubah Formula Master',
      icon: '🧪',
      footerText: 'Kelola Formula & Pyramid',
      bgGradient: 'from-[#C9A02E]/25 to-[#D4AF37]/10',
      borderColor: 'border-[#D4AF37]/40',
      textColor: 'text-[#D4AF37]'
    },
    {
      id: 'maceration_vats' as AdminTab,
      value: '8 Tangki',
      label: 'Maserasi Vat Berjalan',
      icon: '🛢️',
      footerText: 'Pantau Suhu & Hari Kematangan',
      bgGradient: 'from-emerald-600/25 to-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400'
    },
    {
      id: 'inventory' as AdminTab,
      value: '3 Bahan',
      label: 'Stok Kritis / Reorder',
      icon: '⚠️',
      footerText: 'Audit Lot Supplier & COA',
      bgGradient: 'from-amber-600/25 to-red-500/10',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400'
    },
    {
      id: 'passports' as AdminTab,
      value: '1,840 Botol',
      label: 'Digital Scent Passport',
      icon: '🏷️',
      footerText: 'Audit Verifikasi QR Pembeli',
      bgGradient: 'from-sky-600/25 to-blue-500/10',
      borderColor: 'border-sky-500/40',
      textColor: 'text-sky-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {boxes.map((b) => (
        <div
          key={b.id}
          className={`rounded-2xl border ${b.borderColor} bg-gradient-to-br ${b.bgGradient} p-5 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:scale-[1.01] transition-transform`}
        >
          {/* Faint ambient large icon in background (AdminLTE style) */}
          <span className="absolute -bottom-2 -right-2 text-6xl opacity-15 select-none pointer-events-none group-hover:scale-110 transition-transform">
            {b.icon}
          </span>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{b.icon}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/40 text-neutral-300 border border-white/10">
                PostgreSQL
              </span>
            </div>
            <div className={`text-2xl font-bold ${b.textColor} tracking-tight mt-3 font-display`}>
              {b.value}
            </div>
            <div className="text-xs text-neutral-300 font-medium mt-0.5">{b.label}</div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab(b.id)}
            className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>{b.footerText}</span>
            <span className="group-hover:translate-x-1 transition-transform">➜</span>
          </button>
        </div>
      ))}
    </div>
  )
}
