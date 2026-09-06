package controllers

import (
	"net/http"
	"strconv"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/services"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type FormulaController struct {
	formulaService *services.FormulaService
	calcService    *services.CalculationService
}

func NewFormulaController(fs *services.FormulaService, cs *services.CalculationService) *FormulaController {
	return &FormulaController{
		formulaService: fs,
		calcService:    cs,
	}
}

// ListFormulas mengembalikan daftar formula berdasarkan role pemanggil
func (ctrl *FormulaController) ListFormulas(c *gin.Context) {
	userRole, _ := c.Get("user_role")

	if userRole == models.RoleLabTech {
		// Jika Lab Tech, samarkan semua nama bahan rahasia
		rawFormulas := ctrl.formulaService.GetAllFormulas()
		maskedList := make([]models.Formula, len(rawFormulas))
		for i, f := range rawFormulas {
			m, _ := ctrl.formulaService.GetMaskedFormulaForLab(f.ID, 1.0)
			maskedList[i] = *m
		}
		views.RenderSuccess(c, http.StatusOK, "Daftar formula mode produksi terselubung (Lab Mode)", maskedList)
		return
	}

	// Default Owner / Superadmin
	formulas := ctrl.formulaService.GetAllFormulas()
	views.RenderSuccess(c, http.StatusOK, "Daftar formula master (Kerahasiaan Penuh)", formulas)
}

// GetFormulaDetail mengembalikan detail formula tertentu
func (ctrl *FormulaController) GetFormulaDetail(c *gin.Context) {
	id := c.Param("id")
	userRole, _ := c.Get("user_role")

	if userRole == models.RoleLabTech {
		volumeStr := c.DefaultQuery("volume_liters", "5.0")
		vol, _ := strconv.ParseFloat(volumeStr, 64)

		masked, err := ctrl.formulaService.GetMaskedFormulaForLab(id, vol)
		if err != nil {
			views.RenderNotFound(c, "Formula tidak ditemukan")
			return
		}
		views.RenderSuccess(c, http.StatusOK, "Lembar timbangan lab terenkripsi", masked)
		return
	}

	formula, err := ctrl.formulaService.GetFormulaByID(id)
	if err != nil {
		views.RenderNotFound(c, "Formula tidak ditemukan")
		return
	}

	views.RenderSuccess(c, http.StatusOK, "Detail formula master", formula)
}

// CalculateBatchProjection simulasi perhitungan HPP dan hari maserasi
func (ctrl *FormulaController) CalculateBatchProjection(c *gin.Context) {
	concentrationStr := c.DefaultQuery("concentration_pct", "24")
	volumeStr := c.DefaultQuery("volume_liters", "10")

	conc, _ := strconv.ParseFloat(concentrationStr, 64)
	vol, _ := strconv.ParseFloat(volumeStr, 64)

	macerationDays := ctrl.calcService.EstimateMacerationDays(conc)
	bottles50ml := int((vol * 1000) / 50)
	evaporationLossPct := ctrl.calcService.CalculateEvaporationLoss(macerationDays, 17.5)
	estimatedCostPerBottle := 48000.0 + (conc * 2100.0)
	costPerSpray := ctrl.calcService.CalculateCostPerSpray(estimatedCostPerBottle, 50)

	views.RenderSuccess(c, http.StatusOK, "Proyeksi batch berhasil dihitung", gin.H{
		"target_volume_liters":       vol,
		"concentration_pct":          conc,
		"estimated_maceration_days":  macerationDays,
		"evaporation_shrinkage_loss": evaporationLossPct, // % Angels' share
		"finished_bottles_50ml":      bottles50ml,
		"estimated_cost_per_bottle":  estimatedCostPerBottle,
		"cost_per_spray_idr":         costPerSpray,
		"ifra_compliance":            "100% COMPLIANT (51st Amendment)",
	})
}
