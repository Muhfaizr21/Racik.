package models

import "time"

type PyramidLayer string

const (
	LayerTop     PyramidLayer = "TOP"
	LayerHeart   PyramidLayer = "HEART"
	LayerBase    PyramidLayer = "BASE"
	LayerSolvent PyramidLayer = "SOLVENT"
)

type FormulaIngredient struct {
	ID              uint         `json:"id" gorm:"primaryKey"`
	FormulaID       string       `json:"formula_id" gorm:"size:64;index;not null"`
	MaterialID      string       `json:"material_id" gorm:"size:64;not null"`
	MaterialName    string       `json:"material_name,omitempty" gorm:"size:191"` // Disembunyikan di Masked Mode
	ContainerCode   string       `json:"container_code" gorm:"size:64"`          // Ditampilkan ke Lab Tech
	Layer           PyramidLayer `json:"layer" gorm:"size:32"`
	Percentage      float64      `json:"percentage" gorm:"type:numeric(6,2)"`    // Persentase formula (0-100)
	TargetWeightG   float64      `json:"target_weight_g" gorm:"type:numeric(10,2)"` // Target timbangan gram
	SpecificGravity float64      `json:"specific_gravity" gorm:"type:numeric(6,4)"`
}

type Formula struct {
	ID                     string              `json:"id" gorm:"primaryKey;size:64"`
	Code                   string              `json:"code" gorm:"size:64;uniqueIndex;not null"`
	Name                   string              `json:"name" gorm:"size:191;not null"`
	Version                string              `json:"version" gorm:"size:32;default:'v1.0'"`
	ConcentrationPct       float64             `json:"concentration_pct" gorm:"type:numeric(6,2)"`
	ConcentrationType      string              `json:"concentration_type" gorm:"size:64"`
	MacerationTargetDays   int                 `json:"maceration_target_days"`
	Ingredients            []FormulaIngredient `json:"ingredients" gorm:"foreignKey:FormulaID;constraint:OnDelete:CASCADE"`
	EstimatedCostPerBottle float64             `json:"estimated_cost_per_bottle" gorm:"type:numeric(12,2)"`
	IsLocked               bool                `json:"is_locked" gorm:"default:false"`
	CreatedBy              string              `json:"created_by" gorm:"size:128"`
	CreatedAt              time.Time           `json:"created_at"`
	UpdatedAt              time.Time           `json:"updated_at"`
}
