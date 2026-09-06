import { useState, useEffect, useCallback } from 'react'
import type { Formula, BatchProjection, RawMaterialStock } from '../types/formula'
import {
  fetchOwnerFormulas,
  createMasterFormula,
  calculateBatchProjection,
  fetchRawMaterialStocks
} from '../services/ownerService'

export function useOwnerWorkstation() {
  const [formulas, setFormulas] = useState<Formula[]>([])
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null)
  const [materials, setMaterials] = useState<RawMaterialStock[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Batch calculation state
  const [batchVolumeLiters, setBatchVolumeLiters] = useState<number>(10)
  const [batchProjection, setBatchProjection] = useState<BatchProjection | null>(null)

  // Load initial formulas & materials
  useEffect(() => {
    let isMounted = true
    async function initData() {
      setIsLoading(true)
      const [formulaList, materialList] = await Promise.all([
        fetchOwnerFormulas(),
        fetchRawMaterialStocks()
      ])
      if (isMounted) {
        setFormulas(formulaList)
        if (formulaList.length > 0) {
          setSelectedFormula(formulaList[0])
        }
        setMaterials(materialList)
        setIsLoading(false)
      }
    }
    initData()
    return () => {
      isMounted = false
    }
  }, [])

  // Auto calculate batch projection when selected formula or volume changes
  useEffect(() => {
    let isMounted = true
    const conc = selectedFormula?.concentration_pct || 24
    calculateBatchProjection(conc, batchVolumeLiters).then((projection) => {
      if (isMounted) {
        setBatchProjection(projection)
      }
    })
    return () => {
      isMounted = false
    }
  }, [selectedFormula, batchVolumeLiters])

  // Auto dismiss toast
  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  // Toggle formula lock status (Formula IP Protection)
  const toggleFormulaLock = useCallback((formulaId: string) => {
    setFormulas((prev) =>
      prev.map((f) => {
        if (f.id === formulaId) {
          const updated = { ...f, is_locked: !f.is_locked }
          if (selectedFormula?.id === formulaId) {
            setSelectedFormula(updated)
          }
          setToastMessage(
            updated.is_locked
              ? `Kubah Terkunci: Hak cipta ${updated.name} terenkripsi untuk produksi lab.`
              : `Kubah Terbuka: Formula ${updated.name} siap diedit kembali.`
          )
          return updated
        }
        return f
      })
    )
  }, [selectedFormula])

  // Save new formula
  const saveNewFormula = useCallback(async (newFormula: Formula): Promise<boolean> => {
    try {
      const saved = await createMasterFormula(newFormula)
      setFormulas((prev) => [saved, ...prev])
      setSelectedFormula(saved)
      setIsEditorOpen(false)
      setToastMessage(`Formula baru "${saved.name}" berhasil disimpan ke PostgreSQL!`)
      return true
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal menyimpan formula'
      setToastMessage(`Error: ${errorMsg}`)
      return false
    }
  }, [])

  return {
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
    saveNewFormula,
    setToastMessage
  }
}
