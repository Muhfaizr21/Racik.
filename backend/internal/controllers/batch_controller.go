package controllers

import (
	"net/http"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BatchController struct {
	db *gorm.DB
}

func NewBatchController(db *gorm.DB) *BatchController {
	return &BatchController{db: db}
}

// ListBatches mengembalikan daftar batch produksi dari PostgreSQL
func (ctrl *BatchController) ListBatches(c *gin.Context) {
	var batches []models.BatchProduction
	if err := ctrl.db.Order("created_at DESC").Find(&batches).Error; err != nil {
		views.RenderInternalError(c, "Gagal mengambil daftar batch dari database")
		return
	}
	views.RenderSuccess(c, http.StatusOK, "Daftar batch produksi & maserasi tangki vat (PostgreSQL)", batches)
}

// GetBatchDetail mengembalikan detail batch tertentu
func (ctrl *BatchController) GetBatchDetail(c *gin.Context) {
	id := c.Param("id")
	var batch models.BatchProduction
	if err := ctrl.db.Where("id = ? OR lot_number = ?", id, id).First(&batch).Error; err != nil {
		views.RenderNotFound(c, "Batch produksi tidak ditemukan di database")
		return
	}
	views.RenderSuccess(c, http.StatusOK, "Detail batch produksi", batch)
}
