package models

import "time"

type BatchStatus string

const (
	BatchStatusWeighing   BatchStatus = "WEIGHING"   // Proses penimbangan lab
	BatchStatusMacerating BatchStatus = "MACERATING" // Sedang maserasi di tangki vat
	BatchStatusChilling   BatchStatus = "CHILLING"   // Pendinginan & chill filtration
	BatchStatusBottling   BatchStatus = "BOTTLING"   // Pembotolan & pelabelan
	BatchStatusCompleted  BatchStatus = "COMPLETED"  // Siap distribusi ke outlet
)

type BatchProduction struct {
	ID                     string      `json:"id"`
	LotNumber              string      `json:"lot_number"` // cth: LOT-202609-SNT-01
	FormulaID              string      `json:"formula_id"`
	FormulaName            string      `json:"formula_name"`
	TargetVolumeLiters     float64     `json:"target_volume_liters"`
	VatTankNumber          string      `json:"vat_tank_number"`
	Status                 BatchStatus `json:"status"`
	MacerationDaysProgress int         `json:"maceration_days_progress"`
	MacerationDaysTarget   int         `json:"maceration_days_target"`
	EvaporationLossPct     float64     `json:"evaporation_loss_pct"` // Toleransi Angels' Share (%)
	HarvestVolumeLiters    float64     `json:"harvest_volume_liters"`
	FinishedBottlesCount   int         `json:"finished_bottles_count"`
	BottleSizeMl           int         `json:"bottle_size_ml"` // 30, 50, 100
	OperatorID             string      `json:"operator_id"`
	CreatedAt              time.Time   `json:"created_at"`
	UpdatedAt              time.Time   `json:"updated_at"`
}
