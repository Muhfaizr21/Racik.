package services

import (
	"errors"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
)

type FormulaService struct {
	calcService *CalculationService
	// InMemory repository simulation
	formulas []models.Formula
}

func NewFormulaService(calcService *CalculationService) *FormulaService {
	// Seed sample fragrance formulas
	initialFormulas := []models.Formula{
		{
			ID:                   "FML-SANTAL-01",
			Code:                 "RCK-SNT-EXT",
			Name:                 "Santal Royale Extrait",
			Version:              "v2.1",
			ConcentrationPct:     24.0,
			ConcentrationType:    "Extrait de Parfum",
			MacerationTargetDays: 32,
			IsLocked:             true,
			EstimatedCostPerBottle: 90800,
			CreatedBy:            "Master Perfumer",
			CreatedAt:            time.Now().AddDate(0, -1, 0),
			UpdatedAt:            time.Now(),
			Ingredients: []models.FormulaIngredient{
				{
					MaterialID:      "MAT-001",
					MaterialName:    "Bergamot Calabria Cold-Pressed",
					ContainerCode:   "WADAH-TOP-01",
					Layer:           models.LayerTop,
					Percentage:      6.0,
					TargetWeightG:   52.2,
					SpecificGravity: 0.87,
				},
				{
					MaterialID:      "MAT-002",
					MaterialName:    "Cardamom CO2 Seed Extract",
					ContainerCode:   "WADAH-TOP-02",
					Layer:           models.LayerTop,
					Percentage:      2.0,
					TargetWeightG:   18.4,
					SpecificGravity: 0.92,
				},
				{
					MaterialID:      "MAT-003",
					MaterialName:    "Rosa Damascena Absolute",
					ContainerCode:   "WADAH-HRT-01",
					Layer:           models.LayerHeart,
					Percentage:      4.0,
					TargetWeightG:   39.2,
					SpecificGravity: 0.98,
				},
				{
					MaterialID:      "MAT-004",
					MaterialName:    "Assam Agarwood (Oud Extract)",
					ContainerCode:   "WADAH-BAS-01",
					Layer:           models.LayerBase,
					Percentage:      5.0,
					TargetWeightG:   49.0,
					SpecificGravity: 0.98,
				},
				{
					MaterialID:      "MAT-005",
					MaterialName:    "Mysore Sandalwood Oil (Santalol 90%)",
					ContainerCode:   "WADAH-BAS-02",
					Layer:           models.LayerBase,
					Percentage:      7.0,
					TargetWeightG:   67.9,
					SpecificGravity: 0.97,
				},
				{
					MaterialID:      "MAT-006",
					MaterialName:    "Etanol 96% Absolute Denat",
					ContainerCode:   "DRUM-SOLVENT-01",
					Layer:           models.LayerSolvent,
					Percentage:      76.0,
					TargetWeightG:   611.8,
					SpecificGravity: 0.805,
				},
			},
		},
	}

	return &FormulaService{
		calcService: calcService,
		formulas:    initialFormulas,
	}
}

// GetAllFormulas mengembalikan semua formula dengan detail lengkap (Khusus Role Owner)
func (s *FormulaService) GetAllFormulas() []models.Formula {
	return s.formulas
}

// GetFormulaByID mencari formula berdasarkan ID
func (s *FormulaService) GetFormulaByID(id string) (*models.Formula, error) {
	for _, f := range s.formulas {
		if f.ID == id || f.Code == id {
			return &f, nil
		}
	}
	return nil, errors.New("formula tidak ditemukan")
}

// GetMaskedFormulaForLab mengembalikan formula dengan menyembunyikan nama dagang bahan rahasia (Khusus Lab Tech)
func (s *FormulaService) GetMaskedFormulaForLab(id string, batchVolumeL float64) (*models.Formula, error) {
	f, err := s.GetFormulaByID(id)
	if err != nil {
		return nil, err
	}

	// Buat salinan deep copy dengan sensor nama rahasia
	masked := *f
	masked.Ingredients = make([]models.FormulaIngredient, len(f.Ingredients))

	scaleFactor := batchVolumeL // default formula dihitung per 1 Liter
	if scaleFactor <= 0 {
		scaleFactor = 1.0
	}

	for i, ing := range f.Ingredients {
		masked.Ingredients[i] = models.FormulaIngredient{
			MaterialID:      ing.MaterialID,
			MaterialName:    "[DISAMARKAN - RAHASIA PRODUKSI]",
			ContainerCode:   ing.ContainerCode,
			Layer:           ing.Layer,
			Percentage:      ing.Percentage,
			TargetWeightG:   ing.TargetWeightG * scaleFactor,
			SpecificGravity: ing.SpecificGravity,
		}
	}

	return &masked, nil
}
