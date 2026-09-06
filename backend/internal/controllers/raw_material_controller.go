package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type RawMaterialController struct {
	materials []models.RawMaterial
}

func NewRawMaterialController() *RawMaterialController {
	sampleMaterials := []models.RawMaterial{
		{
			ID:              "MAT-001",
			Code:            "ESS-BG-CAL",
			Name:            "Bergamot Calabria Cold-Pressed",
			Category:        models.CategoryEssence,
			SpecificGravity: 0.875,
			StockGrams:      4250.0,
			CostPerGram:     1850.0,
			SupplierName:    "Capua 1880 S.r.l (Italia)",
			LotNumber:       "LOT-2025-BG99",
			COANumber:       "COA-IT-48821",
			ExpiryDate:      time.Now().AddDate(1, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -2, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-002",
			Code:            "ESS-OUD-ASM",
			Name:            "Assam Agarwood (Oud CO2 Extract)",
			Category:        models.CategoryEssence,
			SpecificGravity: 0.982,
			StockGrams:      850.0,
			CostPerGram:     12500.0,
			SupplierName:    "Assam Aromatics (India)",
			LotNumber:       "LOT-2024-OUD12",
			COANumber:       "COA-IN-9092",
			ExpiryDate:      time.Now().AddDate(3, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -6, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-003",
			Code:            "SOLV-ALC-96",
			Name:            "Etanol 96% Absolute Denat Organik",
			Category:        models.CategorySolvent,
			SpecificGravity: 0.805,
			StockGrams:      48000.0, // ~60 Liter
			CostPerGram:     45.0,
			SupplierName:    "PT Molindo Raya Industrial",
			LotNumber:       "MLD-2601-DRUM4",
			COANumber:       "COA-ID-260199",
			ExpiryDate:      time.Now().AddDate(2, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -1, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-004",
			Code:            "BTL-FLC-50",
			Name:            "Flacon Kaca Bening 50ml (Crimp Neck)",
			Category:        models.CategoryBottle,
			SpecificGravity: 1.0,
			StockGrams:      1240.0, // 1240 unit botol
			CostPerGram:     14500.0,
			SupplierName:    "SGD Pharma",
			LotNumber:       "BTL-2026-SGD01",
			COANumber:       "N/A",
			ExpiryDate:      time.Now().AddDate(10, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -1, 0),
			UpdatedAt:       time.Now(),
		},
	}

	return &RawMaterialController{materials: sampleMaterials}
}

// ListMaterials mengembalikan daftar stok bahan baku gudang
func (ctrl *RawMaterialController) ListMaterials(c *gin.Context) {
	views.RenderSuccess(c, http.StatusOK, "Daftar inventori bahan baku dan kemasan", ctrl.materials)
}

// GetLowStockAlerts menampilkan bahan yang mendekati batas minimum pemesanan
func (ctrl *RawMaterialController) GetLowStockAlerts(c *gin.Context) {
	alerts := []gin.H{
		{
			"material_code":  "ESS-OUD-ASM",
			"name":           "Assam Agarwood (Oud CO2 Extract)",
			"stock_grams":    850.0,
			"threshold_g":    1000.0,
			"status":         "LOW_STOCK",
			"recommendation": "Pesan ulang ke supplier (Lead time pengiriman 14 hari)",
		},
	}

	views.RenderSuccess(c, http.StatusOK, "Peringatan stok minimum bahan baku", alerts)
}
