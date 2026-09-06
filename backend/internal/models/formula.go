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
	MaterialID      string       `json:"material_id"`
	MaterialName    string       `json:"material_name,omitempty"` // Disembunyikan di Masked Mode
	ContainerCode   string       `json:"container_code"`          // Ditampilkan ke Lab Tech (cth: WADAH-A01)
	Layer           PyramidLayer `json:"layer"`
	Percentage      float64      `json:"percentage"`              // Persentase formula (0-100)
	TargetWeightG   float64      `json:"target_weight_g"`         // Target timbangan gram
	SpecificGravity float64      `json:"specific_gravity"`
}

type Formula struct {
	ID                  string              `json:"id"`
	Code                string              `json:"code"` // cth: FML-SANTAL-01
	Name                string              `json:"name"` // cth: Santal Royale Extrait
	Version             string              `json:"version"` // cth: v2.1
	ConcentrationPct    float64             `json:"concentration_pct"` // cth: 24.0%
	ConcentrationType   string              `json:"concentration_type"` // Extrait / EDP / EDT
	MacerationTargetDays int                `json:"maceration_target_days"`
	Ingredients         []FormulaIngredient `json:"ingredients"`
	EstimatedCostPerBottle float64          `json:"estimated_cost_per_bottle"` // IDR per 50ml
	IsLocked            bool                `json:"is_locked"`
	CreatedBy           string              `json:"created_by"`
	CreatedAt           time.Time           `json:"created_at"`
	UpdatedAt           time.Time           `json:"updated_at"`
}
