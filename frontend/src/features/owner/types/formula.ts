/**
 * Clean domain types for Master Perfumer (Owner) Workstation.
 */

export type FragranceLayer = 'TOP' | 'HEART' | 'BASE' | 'SOLVENT'

export interface FormulaIngredient {
  id?: number
  formula_id?: string
  material_id: string
  material_name: string
  container_code: string
  layer: FragranceLayer
  percentage: number
  target_weight_g: number
  specific_gravity: number
}

export interface Formula {
  id: string
  code: string
  name: string
  version: string
  concentration_pct: number
  concentration_type: string
  maceration_target_days: number
  estimated_cost_per_bottle: number
  is_locked: boolean
  created_by: string
  created_at?: string
  updated_at?: string
  ingredients?: FormulaIngredient[]
}

export interface BatchProjection {
  target_volume_liters: number
  concentration_pct: number
  estimated_maceration_days: number
  evaporation_shrinkage_loss: number
  finished_bottles_50ml: number
  estimated_cost_per_bottle: number
  cost_per_spray_idr: number
  ifra_compliance: string
}

export interface RawMaterialStock {
  id: string
  code: string
  name: string
  category: 'ESSENCE' | 'SOLVENT' | 'BOTTLE' | 'CAP' | 'SPRAYER'
  specific_gravity: number
  stock_grams: number
  cost_per_gram: number
  supplier_name?: string
  lot_number?: string
  coa_number?: string
}
