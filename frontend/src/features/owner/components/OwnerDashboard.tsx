import { useOwnerWorkstation } from '../hooks/useOwnerWorkstation'
import { FormulaVaultCard } from './FormulaVaultCard'
import { BatchCalculator } from './BatchCalculator'
import { SecurityMaskingBadge } from './SecurityMaskingBadge'
import { FormulaEditorModal } from './FormulaEditorModal'

interface OwnerDashboardProps {
  onBackToOverview?: () => void
}

export function OwnerDashboard({ onBackToOverview }: OwnerDashboardProps) {
  const {
    formulas,
    selectedFormula,
    materials,
    isLoading,
    isEditorOpen,
    toastMessage,
    batchVolumeLiters,
    batchProjection,
    setSelectedFormula,
    setBatchVolumeLiters,
    setIsEditorOpen,
    toggleFormulaLock,
    saveNewFormula
  } = useOwnerWorkstation()

  return (
    <div className="space-y-8">
      {/* Toast notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-[#1E1C1A] border border-[#D4AF37]/50 text-neutral-200 text-xs font-semibold shadow-xl flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#1E1C1A] via-[#1A1918] to-[#251A18] border border-[#D4AF37]/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              👑 Master Perfumer Workstation
            </span>
            <span className="text-xs text-neutral-400">&bull;</span>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PostgreSQL <code className="font-mono text-neutral-300">racik</code> Aktif
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
            Kubah Formula Master & Kalkulasi Batch
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 mt-1 max-w-2xl">
            Pusat perancangan wewangian, konversi berat jenis (Specific Gravity), proyeksi margin finansial botol, dan enkripsi formula lab.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {onBackToOverview && (
            <button
              type="button"
              onClick={onBackToOverview}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Tutup Workstation
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e6c34a] text-neutral-950 font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>Rancang Formula Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#171615] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Total Formula Master
          </span>
          <div className="text-2xl font-bold text-white tracking-tight">{formulas.length} Arsip</div>
          <div className="text-[11px] text-[#D4AF37] mt-1 font-mono">Terenkripsi di Kubah</div>
        </div>

        <div className="p-4 rounded-xl bg-[#171615] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Rata-rata Konsentrasi
          </span>
          <div className="text-2xl font-bold text-amber-300 tracking-tight">
            {formulas.length > 0
              ? (
                  formulas.reduce((acc, f) => acc + f.concentration_pct, 0) / formulas.length
                ).toFixed(1)
              : 22}
            %
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Standar Extrait / EDP</div>
        </div>

        <div className="p-4 rounded-xl bg-[#171615] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Kapasitas Simulasi Tangki
          </span>
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">
            {batchVolumeLiters} Liter
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            ~{batchProjection?.finished_bottles_50ml || 200} Botol 50ml
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#171615] border border-white/5">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
            Kepatuhan Regulasi IFRA
          </span>
          <div className="text-2xl font-bold text-[#D4AF37] tracking-tight">100%</div>
          <div className="text-[11px] text-emerald-400 mt-1">51st Amendment Compliant</div>
        </div>
      </div>

      {/* Main Grid: Left Vault Cards & Right Batch Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Formula Vault Catalog */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              Katalog Kubah Formula:
            </h3>
            <span className="text-xs text-neutral-400">Pilih untuk simulasi</span>
          </div>

          {isLoading ? (
            <div className="p-10 text-center text-neutral-400 text-xs">
              Memuat data formula dari PostgreSQL...
            </div>
          ) : (
            <div className="space-y-3">
              {formulas.map((formula) => (
                <FormulaVaultCard
                  key={formula.id}
                  formula={formula}
                  isSelected={selectedFormula?.id === formula.id}
                  onSelect={setSelectedFormula}
                  onToggleLock={toggleFormulaLock}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column (7 Cols): Batch Projection Calculator & Security Masking */}
        <div className="lg:col-span-7 space-y-6">
          <BatchCalculator
            formula={selectedFormula}
            batchVolumeLiters={batchVolumeLiters}
            projection={batchProjection}
            onVolumeChange={setBatchVolumeLiters}
          />

          {selectedFormula && (
            <SecurityMaskingBadge formula={selectedFormula} />
          )}
        </div>
      </div>

      {/* Formula Editor Modal */}
      <FormulaEditorModal
        isOpen={isEditorOpen}
        materials={materials}
        onClose={() => setIsEditorOpen(false)}
        onSave={saveNewFormula}
      />
    </div>
  )
}
