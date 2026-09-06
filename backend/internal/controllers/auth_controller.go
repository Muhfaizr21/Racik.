package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthController struct {
	db *gorm.DB
}

func NewAuthController(db *gorm.DB) *AuthController {
	return &AuthController{db: db}
}

func (a *AuthController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		views.RenderBadRequest(c, "Format input login tidak valid", err.Error())
		return
	}

	var user models.User
	var found bool

	// 1. Coba cari user dari database PostgreSQL
	if a.db != nil {
		if err := a.db.Where("email = ?", req.Email).First(&user).Error; err == nil {
			found = true
		}
	}

	// 2. Fallback akun demo terverifikasi jika belum terdaftar di database
	if !found {
		switch req.Email {
		case "owner@racik.id":
			user = models.User{
				ID:        "USR-001",
				Name:      "Faiz Ramadhan (Master Perfumer)",
				Email:     req.Email,
				Role:      models.RoleOwner,
				CreatedAt: time.Now(),
			}
		case "lab@racik.id":
			user = models.User{
				ID:        "USR-002",
				Name:      "Budi Santoso (Lab Technician)",
				Email:     req.Email,
				Role:      models.RoleLabTech,
				CreatedAt: time.Now(),
			}
		case "warehouse@racik.id":
			user = models.User{
				ID:        "USR-003",
				Name:      "Siti Rahma (Kepala Gudang)",
				Email:     req.Email,
				Role:      models.RoleWarehouse,
				CreatedAt: time.Now(),
			}
		case "cashier@racik.id":
			user = models.User{
				ID:        "USR-004",
				Name:      "Dewi Lestari (Kasir Butik)",
				Email:     req.Email,
				Role:      models.RoleCashier,
				OutletID:  "OUTLET-SENOPATI-01",
				CreatedAt: time.Now(),
			}
		default:
			user = models.User{
				ID:        "USR-DEMO",
				Name:      "User Operasional",
				Email:     req.Email,
				Role:      models.RoleOwner,
				CreatedAt: time.Now(),
			}
		}
	}

	token := "bearer-token-" + string(user.Role) + "-" + user.ID

	views.RenderSuccess(c, http.StatusOK, "Login berhasil ke Racik Parfumerie OS", models.LoginResponse{
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
