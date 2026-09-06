package controllers

import (
	"net/http"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PassportController struct {
	db *gorm.DB
}

func NewPassportController(db *gorm.DB) *PassportController {
	return &PassportController{db: db}
}

// VerifyByHash memverifikasi keaslian botol parfum untuk pembeli (Akses Publik via PostgreSQL)
func (ctrl *PassportController) VerifyByHash(c *gin.Context) {
	hash := c.Param("hash")

	var passport models.DigitalScentPassport
	if err := ctrl.db.Where("qr_hash = ?", hash).First(&passport).Error; err != nil {
		views.RenderNotFound(c, "Nomor seri / hash batch wewangian tidak terdaftar dalam kubah database Racik")
		return
	}

	// Increment total scan count & simpan ke PostgreSQL
	ctrl.db.Model(&passport).Update("total_scanned_count", passport.TotalScannedCount+1)
	passport.TotalScannedCount++

	views.RenderSuccess(c, http.StatusOK, "Digital Scent Passport terverifikasi asli dari PostgreSQL", passport)
}
