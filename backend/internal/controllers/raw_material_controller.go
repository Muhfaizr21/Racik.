package controllers

import (
	"net/http"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RawMaterialController struct {
	db *gorm.DB
}

func NewRawMaterialController(db *gorm.DB) *RawMaterialController {
	return &RawMaterialController{db: db}
}

// ListMaterials mengembalikan daftar stok bahan baku gudang dari PostgreSQL
func (ctrl *RawMaterialController) ListMaterials(c *gin.Context) {
	var materials []models.RawMaterial
	if err := ctrl.db.Order("name ASC").Find(&materials).Error; err != nil {
		views.RenderInternalError(c, "Gagal mengambil data inventori dari database")
		return
	}
	views.RenderSuccess(c, http.StatusOK, "Daftar inventori bahan baku dan kemasan (PostgreSQL)", materials)
}

// GetLowStockAlerts menampilkan bahan yang mendekati batas minimum pemesanan
func (ctrl *RawMaterialController) GetLowStockAlerts(c *gin.Context) {
	var lowStockMaterials []models.RawMaterial
	// Bahan baku yang tersisa di bawah 1000 gram (1 kg)
	ctrl.db.Where("stock_grams < ? AND category = ?", 1000.0, models.CategoryEssence).Find(&lowStockMaterials)

	views.RenderSuccess(c, http.StatusOK, "Peringatan stok minimum bahan baku", lowStockMaterials)
}
