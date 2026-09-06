/**
 * Domain types for authentication and multi-role access in Racik Parfumerie OS.
 */

export type UserRole = 'OWNER' | 'LAB_TECH' | 'WAREHOUSE' | 'CASHIER' | 'CUSTOMER'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  outlet_id?: string
  token?: string
}

export interface RolePreset {
  role: UserRole
  label: string
  name: string
  email: string
  defaultPassword: string
  icon: string
  accentColor: string
  scopeDescription: string
  keyPermissions: string[]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthApiResponse {
  success: boolean
  message: string
  data?: {
    token: string
    user: AuthUser
  }
  error?: string
}
