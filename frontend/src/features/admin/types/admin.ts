export type AdminTab =
  | 'overview'
  | 'formulas'
  | 'calculator'
  | 'maceration_vats'
  | 'inventory'
  | 'passports'
  | 'users'
  | 'settings'

export interface AdminNotification {
  id: string
  title: string
  time: string
  type: 'warning' | 'info' | 'success'
}

export interface VatTankItem {
  id: string
  vat_number: string
  formula_name: string
  lot_number: string
  volume_liters: number
  days_progress: number
  days_target: number
  evaporation_pct: number
  temperature_c: number
  status: 'MACERATING' | 'READY_HARVEST' | 'RESTING'
}
