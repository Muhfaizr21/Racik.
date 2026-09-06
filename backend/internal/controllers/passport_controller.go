package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type PassportController struct {
	passports map[string]*models.DigitalScentPassport
}

func NewPassportController() *PassportController {
	registry := map[string]*models.DigitalScentPassport{
		"2609-EDP-042": {
			ID:                 "PSP-001",
			QRHash:             "2609-EDP-042",
			NFCTagUID:          "04:7F:4B:99:C2:A1:80",
			LotNumber:          "LOT-202609-SNT-01",
			BottleSerialNumber: "042/200",
			BrandName:          "MAISON DE PARFUM",
			VariantName:        "Santal Royale Extrait",
			ConcentrationType:  "Extrait de Parfum (24% Concentree)",
			TopNotesSummary:    "Bergamot Reggio Calabria, Pink Pepper CO2",
			HeartNotesSummary:  "Rosa Damascena Absolute, Orris Butter",
			BaseNotesSummary:   "Assam Oud, Mysore Sandalwood Oil, Ambroxan",
			HarvestProvenance:  "Calabria (Italia) & Mysore (India) - Panen 2025",
			MacerationDays:     32,
			BottledDate:        time.Date(2026, 2, 18, 0, 0, 0, 0, time.UTC),
			TotalScannedCount:  1,
			IsAuthentic:        true,
			DistributorOutlet:  "Official Flagship Butik Senopati Jakarta",
			CreatedAt:          time.Now(),
		},
	}

	return &PassportController{passports: registry}
}

// VerifyByHash memverifikasi keaslian botol parfum untuk pembeli (Akses Publik / Customer)
func (ctrl *PassportController) VerifyByHash(c *gin.Context) {
	hash := c.Param("hash")

	passport, exists := ctrl.passports[hash]
	if !exists {
		views.RenderNotFound(c, "Nomor seri / hash batch wewangian tidak terdaftar dalam kubah Racik")
		return
	}

	// Tambahkan jumlah pemindaian (anti-duplikasi)
	passport.TotalScannedCount++

	views.RenderSuccess(c, http.StatusOK, "Digital Scent Passport terverifikasi asli", passport)
}
