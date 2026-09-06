import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Formula, FormulaIngredient, FragranceLayer, RawMaterialStock } from '../types/formula'

interface FormulaEditorModalProps {
  isOpen: boolean
  materials: RawMaterialStock[]
  onClose: () => void
  onSave: (formula: Formula) => Promise<boolean>
}

export function FormulaEditorModal({
  isOpen,
  materials,
  onClose,
  onSave
}: FormulaEditorModalProps) {
  const [code, setCode] = useState('RCK-OUD-EX')
  const [name, setName] = useState('Oud Imperial Extrait')
  const [version, setVersion] = useState('v1.0')
  const [concentrationType, setConcentrationType] = useState('Extrait de Parfum')
  const [macerationDays, setMacerationDays] = useState(35)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initial ingredients
  const [ingredients, setIngredients] = useState<FormulaIngredient[]>([
    {
      material_id: 'MAT-001',
      material_name: 'Bergamot Calabria Cold-Pressed',
      container_code: 'WADAH-TOP-01',
      layer: 'TOP',
      percentage: 8,
      target_weight_g: 69.6,
      specific_gravity: 0.875
    },
    {
      material_id: 'MAT-002',
      material_name: 'Assam Agarwood (Oud CO2 Extract)',
      container_code: 'WADAH-BAS-01',
      layer: 'BASE',
      percentage: 16,
      target_weight_g: 157.1,
      specific_gravity: 0.982
    },
    {
      material_id: 'MAT-003',
      material_name: 'Etanol 96% Absolute Denat Organik',
      container_code: 'DRUM-SOLVENT-01',
      layer: 'SOLVENT',
      percentage: 76,
      target_weight_g: 611.8,
      specific_gravity: 0.805
    }
  ])

  // Calculate sum of percentages
  const totalPercentage = Number(
    ingredients.reduce((sum, ing) => sum + (Number(ing.percentage) || 0), 0).toFixed(1)
  )

  const isBalanced = Math.abs(totalPercentage - 100.0) < 0.01

  // Handle adding new ingredient row
  const handleAddIngredient = () => {
    const defaultMaterial = materials[0] || {
      id: 'MAT-NEW',
      name: 'Bahan Baku Baru',
      specific_gravity: 0.95
    }

    setIngredients([
      ...ingredients,
      {
        material_id: defaultMaterial.id,
        material_name: defaultMaterial.name,
        container_code: `WADAH-0${ingredients.length + 1}`,
        layer: 'HEART',
        percentage: 5,
        target_weight_g: 45.0,
        specific_gravity: defaultMaterial.specific_gravity
      }
    ])
  }

  // Handle removing ingredient row
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  // Handle field change in ingredient
  const handleIngredientChange = (
    index: number,
    field: keyof FormulaIngredient,
    value: string | number
  ) => {
    const updated = [...ingredients]
    const item = { ...updated[index] }

    if (field === 'material_id') {
      const selectedMat = materials.find((m) => m.id === value)
      if (selectedMat) {
        item.material_id = selectedMat.id
        item.material_name = selectedMat.name
        item.specific_gravity = selectedMat.specific_gravity
      }
    } else if (field === 'percentage') {
      item.percentage = Number(value)
    } else if (field === 'layer') {
      item.layer = value as FragranceLayer
    } else if (field === 'container_code') {
      item.container_code = String(value)
    }

    // Auto recalculate target weight for 1 Liter standard base
    const volMl = 1000 * (item.percentage / 100)
    item.target_weight_g = Number((volMl * item.specific_gravity).toFixed(1))

    updated[index] = item
    setIngredients(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isBalanced) return

    setIsSubmitting(true)
    const essencePct = ingredients
      .filter((i) => i.layer !== 'SOLVENT')
      .reduce((sum, i) => sum + i.percentage, 0)

    const newFormula: Formula = {
      id: `FML-${Date.now().toString().slice(-6)}`,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      version: version.trim(),
      concentration_pct: essencePct,
      concentration_type: concentrationType,
      maceration_target_days: macerationDays,
      estimated_cost_per_bottle: Math.round(52000 + essencePct * 2200),
      is_locked: true,
      created_by: 'Faiz Ramadhan (Master Perfumer)',
      ingredients
    }

    await onSave(newFormula)
    setIsSubmitting(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl my-8 z-10 rounded-2xl overflow-hidden bg-[#161514] border border-[#D4AF37]/30 shadow-2xl text-neutral-100 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#191816]">
              <div>
                <h3 className="text-lg font-bold text-white font-display tracking-wide">
                  Laboratorium Master: Buat Formula Baru
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Rancang komposisi aroma dengan validasi persentase otomatis & konversi massa berat jenis.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Formula Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Kode Formula
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="RCK-..."
                    className="w-full px-3 py-2 rounded-xl bg-[#1E1C1A] border border-white/10 text-white text-sm font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Nama Kreasi Wewangian
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Santal Imperial Extrait"
                    className="w-full px-3 py-2 rounded-xl bg-[#1E1C1A] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Klasifikasi
                  </label>
                  <select
                    value={concentrationType}
                    onChange={(e) => setConcentrationType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1E1C1A] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Extrait de Parfum">Extrait de Parfum (24-30%)</option>
                    <option value="Eau de Parfum">Eau de Parfum (15-20%)</option>
                    <option value="Eau de Toilette">Eau de Toilette (8-14%)</option>
                    <option value="Eau de Cologne">Eau de Cologne (3-5%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Target Maserasi (Hari)
                  </label>
                  <input
                    type="number"
                    min="7"
                    max="90"
                    value={macerationDays}
                    onChange={(e) => setMacerationDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#1E1C1A] border border-white/10 text-white text-sm focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Versi Rilis
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1E1C1A] border border-white/10 text-white text-sm font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Ingredients Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Komposisi Bahan & Piramida Aroma:
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        isBalanced
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      Total: {totalPercentage}% {isBalanced ? '✓ Tepat 100%' : `(Sisa: ${(100 - totalPercentage).toFixed(1)}%)`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Tambah Bahan</span>
                  </button>
                </div>

                {/* Progress bar visual for 100% balance */}
                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isBalanced ? 'bg-emerald-400' : totalPercentage > 100 ? 'bg-red-400' : 'bg-[#D4AF37]'
                    }`}
                    style={{ width: `${Math.min(100, totalPercentage)}%` }}
                  />
                </div>

                {/* Ingredient Rows */}
                <div className="space-y-2.5">
                  {ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#1D1B1A] border border-white/5 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center text-xs"
                    >
                      {/* Material select */}
                      <div className="sm:col-span-4">
                        <label className="text-[10px] text-neutral-400 block mb-1">Bahan Baku</label>
                        <select
                          value={ing.material_id}
                          onChange={(e) => handleIngredientChange(idx, 'material_id', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#141312] border border-white/10 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
                        >
                          {materials.map((mat) => (
                            <option key={mat.id} value={mat.id}>
                              {mat.name} (SG: {mat.specific_gravity})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Layer select */}
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Layer</label>
                        <select
                          value={ing.layer}
                          onChange={(e) => handleIngredientChange(idx, 'layer', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#141312] border border-white/10 text-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none"
                        >
                          <option value="TOP">Top Note</option>
                          <option value="HEART">Heart Note</option>
                          <option value="BASE">Base Note</option>
                          <option value="SOLVENT">Solvent</option>
                        </select>
                      </div>

                      {/* Container code */}
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Kode Wadah</label>
                        <input
                          type="text"
                          value={ing.container_code}
                          onChange={(e) => handleIngredientChange(idx, 'container_code', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#141312] border border-white/10 text-neutral-200 text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      {/* Percentage */}
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-neutral-400 block mb-1">Proporsi (%)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.1"
                          max="100"
                          value={ing.percentage}
                          onChange={(e) => handleIngredientChange(idx, 'percentage', e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg bg-[#141312] border border-white/10 text-[#D4AF37] text-xs font-bold font-mono focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>

                      {/* Target weight (g) & delete */}
                      <div className="sm:col-span-2 flex items-center justify-between gap-2 pt-3 sm:pt-0">
                        <div className="font-mono text-neutral-300">
                          <span className="text-[10px] text-neutral-400 block">Massa/L:</span>
                          <span className="font-bold">{ing.target_weight_g}g</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(idx)}
                          disabled={ingredients.length <= 1}
                          className="w-7 h-7 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Hapus bahan"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/5 text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={!isBalanced || isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e6c34a] text-neutral-950 font-bold text-xs tracking-wide shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Menyimpan ke PostgreSQL...</span>
                  ) : (
                    <span>Simpan & Kunci ke Kubah Formula</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
