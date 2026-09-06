package services

import (
	"errors"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"gorm.io/gorm"
)

type FormulaService struct {
	db          *gorm.DB
	calcService *CalculationService
}

func NewFormulaService(db *gorm.DB, calcService *CalculationService) *FormulaService {
	return &FormulaService{
		db:          db,
		calcService: calcService,
	}
}

// GetAllFormulas mengembalikan semua formula dari database PostgreSQL (Khusus Role Owner)
func (s *FormulaService) GetAllFormulas() []models.Formula {
	var formulas []models.Formula
	s.db.Preload("Ingredients").Find(&formulas)
	return formulas
}

// GetFormulaByID mencari formula dari PostgreSQL berdasarkan ID atau Kode
func (s *FormulaService) GetFormulaByID(id string) (*models.Formula, error) {
	var formula models.Formula
	err := s.db.Preload("Ingredients").Where("id = ? OR code = ?", id, id).First(&formula).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("formula tidak ditemukan di database")
		}
		return nil, err
	}
	return &formula, nil
}

// GetMaskedFormulaForLab mengembalikan formula dengan nama bahan yang disamarkan (Khusus Lab Tech)
func (s *FormulaService) GetMaskedFormulaForLab(id string, batchVolumeL float64) (*models.Formula, error) {
	f, err := s.GetFormulaByID(id)
	if err != nil {
		return nil, err
	}

	masked := *f
	masked.Ingredients = make([]models.FormulaIngredient, len(f.Ingredients))

	scaleFactor := batchVolumeL
	if scaleFactor <= 0 {
		scaleFactor = 1.0
	}

	for i, ing := range f.Ingredients {
		masked.Ingredients[i] = models.FormulaIngredient{
			ID:              ing.ID,
			FormulaID:       ing.FormulaID,
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

// CreateFormula menyimpan formula baru ke database PostgreSQL
func (s *FormulaService) CreateFormula(f *models.Formula) error {
	return s.db.Create(f).Error
}
