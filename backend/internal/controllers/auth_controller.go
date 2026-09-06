package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type AuthController struct{}

func NewAuthController() *AuthController {
	return &AuthController{}
}

func (a *AuthController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		views.RenderBadRequest(c, "Format input login tidak valid", err.Error())
		return
	}

	// Contoh akun demo per role
	var user models.User
	var token string

	switch req.Email {
	case "owner@racik.id":
		user = models.User{
			ID:        "USR-001",
			Name:      "Faiz Ramadhan (Master Perfumer)",
			Email:     req.Email,
			Role:      models.RoleOwner,
			CreatedAt: time.Now(),
		}
		token = "bearer-token-owner"
	case "lab@racik.id":
		user = models.User{
			ID:        "USR-002",
			Name:      "Budi Santoso (Lab Technician)",
			Email:     req.Email,
			Role:      models.RoleLabTech,
			CreatedAt: time.Now(),
		}
		token = "bearer-token-labtech"
	case "warehouse@racik.id":
		user = models.User{
			ID:        "USR-003",
			Name:      "Siti Rahma (Kepala Gudang)",
			Email:     req.Email,
			Role:      models.RoleWarehouse,
			CreatedAt: time.Now(),
		}
		token = "bearer-token-warehouse"
	case "cashier@racik.id":
		user = models.User{
			ID:        "USR-004",
			Name:      "Dewi Lestari (Kasir Butik)",
			Email:     req.Email,
			Role:      models.RoleCashier,
			OutletID:  "OUTLET-SENOPATI-01",
			CreatedAt: time.Now(),
		}
		token = "bearer-token-cashier"
	default:
		// Default mock login
		user = models.User{
			ID:        "USR-DEFAULT",
			Name:      "User Demo",
			Email:     req.Email,
			Role:      models.RoleOwner,
			CreatedAt: time.Now(),
		}
		token = "bearer-token-owner"
	}

	views.RenderSuccess(c, http.StatusOK, "Login berhasil", models.LoginResponse{
		Token: token,
		User:  user,
	})
}

// GetRolesList mengembalikan daftar role yang tersedia dalam sistem Racik
func (a *AuthController) GetRolesList(c *gin.Context) {
	roles := []gin.H{
		{"role": models.RoleOwner, "label": "Owner / Master Perfumer", "scope": "Akses Penuh Seluruh Formula & Finansial"},
		{"role": models.RoleLabTech, "label": "Lab Technician", "scope": "Mode Produksi Terselubung & Penimbangan"},
		{"role": models.RoleWarehouse, "label": "Warehouse Manager", "scope": "Inventori Bahan Baku, Botol & Label Batch"},
		{"role": models.RoleCashier, "label": "Boutique Cashier", "scope": "POS Penjualan, Decant & Konsultasi Scent"},
		{"role": models.RoleCustomer, "label": "End Customer", "scope": "Akses Publik Digital Scent Passport via Scan QR"},
	}

	views.RenderSuccess(c, http.StatusOK, "Daftar role sistem Racik", roles)
}
