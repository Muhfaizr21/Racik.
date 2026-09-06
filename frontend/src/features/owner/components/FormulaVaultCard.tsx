import type { Formula } from '../types/formula'

interface FormulaVaultCardProps {
  formula: Formula
  isSelected: boolean
  onSelect: (formula: Formula) => void
  onToggleLock: (formulaId: string) => void
}

export function FormulaVaultCard({
  formula,
  isSelected,
  onSelect,
  onToggleLock
}: FormulaVaultCardProps) {
  const topNotes = formula.ingredients?.filter((i) => i.layer === 'TOP') || []
  const heartNotes = formula.ingredients?.filter((i) => i.layer === 'HEART') || []
  const baseNotes = formula.ingredients?.filter((i) => i.layer === 'BASE') || []
  const solventNotes = formula.ingredients?.filter((i) => i.layer === 'SOLVENT') || []

  return (
    <div
      onClick={() => onSelect(formula)}
      className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
        isSelected
          ? 'bg-[#1E1C1A] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.18)]'
          : 'bg-[#171614]/80 border-white/5 hover:border-white/20 hover:bg-[#1B1918]'
      }`}
    >
      <div>
        {/* Top Header: Code, Version & Encryption Lock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#D4AF37] font-semibold">{formula.code}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-neutral-400 border border-white/10">
              {formula.version}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleLock(formula.id)
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              formula.is_locked
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'bg-neutral-800 text-neutral-400 border border-white/10 hover:text-white'
            }`}
            title={formula.is_locked ? 'Formula Terkunci & Terenkripsi untuk Lab' : 'Formula Terbuka untuk Edit'}
          >
            {formula.is_locked ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Encrypted</span>
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                <span>Unlocked</span>
              </>
            )}
          </button>
        </div>

        {/* Formula Title & Concentration */}
        <h3 className="text-lg font-bold text-white tracking-wide font-display mb-1">{formula.name}</h3>
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
          <span className="text-[#D4AF37] font-semibold">{formula.concentration_type}</span>
          <span>&bull;</span>
          <span>Konsentrasi: {formula.concentration_pct}%</span>
          <span>&bull;</span>
          <span>Maserasi: {formula.maceration_target_days} Hari</span>
        </div>

        {/* Olfactory Pyramid Summary */}
        <div className="space-y-2 py-3 border-y border-white/5 text-xs">
          {topNotes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-14 shrink-0 font-semibold text-amber-300/80">Top:</span>
              <span className="text-neutral-300 truncate">
                {topNotes.map((n) => `${n.material_name} (${n.percentage}%)`).join(', ')}
              </span>
            </div>
          )}
          {heartNotes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-14 shrink-0 font-semibold text-rose-300/80">Heart:</span>
              <span className="text-neutral-300 truncate">
                {heartNotes.map((n) => `${n.material_name} (${n.percentage}%)`).join(', ')}
              </span>
            </div>
          )}
          {baseNotes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-14 shrink-0 font-semibold text-amber-500">Base:</span>
              <span className="text-neutral-300 truncate">
                {baseNotes.map((n) => `${n.material_name} (${n.percentage}%)`).join(', ')}
              </span>
            </div>
          )}
          {solventNotes.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="w-14 shrink-0 font-semibold text-neutral-400">Solvent:</span>
              <span className="text-neutral-400 truncate">
                {solventNotes.map((n) => `${n.material_name} (${n.percentage}%)`).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 pt-3 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">HPP Botol 50ml</span>
          <span className="font-bold text-white">Rp {formula.estimated_cost_per_bottle.toLocaleString('id-ID')}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Master Perfumer</span>
          <span className="text-neutral-300 truncate max-w-[120px] block">{formula.created_by.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  )
}
