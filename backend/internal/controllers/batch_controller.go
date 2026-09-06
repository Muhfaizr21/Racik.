package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type BatchController struct {
	batches []models.BatchProduction
}

func NewBatchController() *BatchController {
	sampleBatches := []models.BatchProduction{
		{
			ID:                     "BATCH-001",
			LotNumber:              "LOT-202609-SNT-01",
			FormulaID:              "FML-SANTAL-01",
			FormulaName:            "Santal Royale Extrait",
			TargetVolumeLiters:     10.0,
			VatTankNumber:          "VAT-STAINLESS-04",
			Status:                 models.BatchStatusMacerating,
			MacerationDaysProgress: 18,
			MacerationDaysTarget:   32,
			EvaporationLossPct:     1.44, // Susut penguapan alami
			HarvestVolumeLiters:    9.85,
			FinishedBottlesCount:   197,
			BottleSizeMl:           50,
			OperatorID:             "USR-002",
			CreatedAt:              time.Now().AddDate(0, 0, -18),
			UpdatedAt:              time.Now(),
		},
		{
			ID:                     "BATCH-002",
			LotNumber:              "LOT-202608-BER-09",
			FormulaID:              "FML-BERG-02",
			FormulaName:            "Calabrian Bergamot EDP",
			TargetVolumeLiters:     20.0,
			VatTankNumber:          "VAT-STAINLESS-02",
			Status:                 models.BatchStatusCompleted,
			MacerationDaysProgress: 24,
			MacerationDaysTarget:   24,
			EvaporationLossPct:     1.92,
			HarvestVolumeLiters:    19.61,
			FinishedBottlesCount:   392,
			BottleSizeMl:           50,
			OperatorID:             "USR-002",
			CreatedAt:              time.Now().AddDate(0, -1, 0),
			UpdatedAt:              time.Now().AddDate(0, 0, -6),
		},
	}

	return &BatchController{batches: sampleBatches}
}

func (ctrl *BatchController) ListBatches(c *gin.Context) {
	views.RenderSuccess(c, http.StatusOK, "Daftar batch produksi & maserasi tangki vat", ctrl.batches)
}

func (ctrl *BatchController) GetBatchDetail(c *gin.Context) {
	id := c.Param("id")
	for _, b := range ctrl.batches {
		if b.ID == id || b.LotNumber == id {
			views.RenderSuccess(c, http.StatusOK, "Detail batch produksi", b)
			return
		}
	}
	views.RenderNotFound(c, "Batch produksi tidak ditemukan")
}
