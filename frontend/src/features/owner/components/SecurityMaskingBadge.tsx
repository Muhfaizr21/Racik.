import { useState } from 'react'
import type { Formula } from '../types/formula'

interface SecurityMaskingBadgeProps {
  formula: Formula
}

export function SecurityMaskingBadge({ formula }: SecurityMaskingBadgeProps) {
  const [activeTab, setActiveTab] = useState<'OWNER' | 'LAB'>('OWNER')

  return (
    <div className="p-6 rounded-2xl bg-[#161514] border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🛡️</span>
            <h4 className="text-sm font-bold text-white tracking-wide">
              Simulasi Proteksi Hak Cipta Formula (Masked Mode)
            </h4>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Bandingkan tampilan formula di layar Owner dengan lembar kerja operator lab saat formula dikunci.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-[#121110] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('OWNER')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'OWNER'
                ? 'bg-[#D4AF37] text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            👑 Tampilan Owner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('LAB')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'LAB'
                ? 'bg-emerald-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🧪 Tampilan Lab Tech
          </button>
        </div>
      </div>

      {/* Comparison Preview */}
      <div className="space-y-2">
        {formula.ingredients?.map((ing, idx) => {
          const isOwner = activeTab === 'OWNER'
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                isOwner
                  ? 'bg-[#1C1B19] border-white/5'
                  : 'bg-[#151D18] border-emerald-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-mono text-[11px] text-neutral-400">
                  {idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-white">
                    {isOwner ? (
                      ing.material_name
                    ) : (
                      <span className="font-mono text-emerald-300">
                        [DISAMARKAN - RAHASIA PRODUKSI]
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                    Wadah: <span className="text-neutral-200">{ing.container_code || `WADAH-0${idx + 1}`}</span> &bull; Layer:{' '}
                    <span className="text-[#D4AF37] font-semibold">{ing.layer}</span>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="font-bold text-white">
                  {isOwner ? `${ing.percentage}%` : 'Terkunci'}
                </div>
                <div className="text-[11px] text-neutral-400">
                  Target: <span className="text-emerald-400">{ing.target_weight_g}g</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-2 text-[11px] text-neutral-400 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>
          {activeTab === 'OWNER'
            ? 'Master Perfumer memegang kunci dekripsi penuh terhadap nama molekul aroma & persentase formulasi.'
            : 'Operator lab hanya melihat kode wadah timbangan & target gramatur, mencegah kebocoran resep parfum asli.'}
        </span>
      </div>
    </div>
  )
}
