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
	ID                     string      `json:"id" gorm:"primaryKey;size:64"`
	LotNumber              string      `json:"lot_number" gorm:"size:64;uniqueIndex;not null"`
	FormulaID              string      `json:"formula_id" gorm:"size:64;index;not null"`
	FormulaName            string      `json:"formula_name" gorm:"size:191"`
	TargetVolumeLiters     float64     `json:"target_volume_liters" gorm:"type:numeric(10,2)"`
	VatTankNumber          string      `json:"vat_tank_number" gorm:"size:64"`
	Status                 BatchStatus `json:"status" gorm:"size:32;default:'WEIGHING'"`
	MacerationDaysProgress int         `json:"maceration_days_progress" gorm:"default:0"`
	MacerationDaysTarget   int         `json:"maceration_days_target"`
	EvaporationLossPct     float64     `json:"evaporation_loss_pct" gorm:"type:numeric(6,2);default:0"`
	HarvestVolumeLiters    float64     `json:"harvest_volume_liters" gorm:"type:numeric(10,2);default:0"`
	FinishedBottlesCount   int         `json:"finished_bottles_count" gorm:"default:0"`
	BottleSizeMl           int         `json:"bottle_size_ml" gorm:"default:50"`
	OperatorID             string      `json:"operator_id" gorm:"size:64"`
	CreatedAt              time.Time   `json:"created_at"`
	UpdatedAt              time.Time   `json:"updated_at"`
}
