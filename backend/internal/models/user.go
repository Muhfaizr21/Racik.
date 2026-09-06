package models

import "time"

type Role string

const (
	RoleOwner      Role = "OWNER"        // Master Perfumer / Pemilik Bisnis
	RoleLabTech    Role = "LAB_TECH"     // Operator Lab / Tim Penimbangan
	RoleWarehouse  Role = "WAREHOUSE"    // Kepala Gudang & Logistik Bahan Baku
	RoleCashier    Role = "CASHIER"      // Kasir Butik & Scent Consultant
	RoleCustomer   Role = "CUSTOMER"     // Konsumen Akhir (Akses Digital Scent Passport)
)

type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      Role      `json:"role"`
	OutletID  string    `json:"outlet_id,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
