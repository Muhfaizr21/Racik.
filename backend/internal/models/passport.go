package models

import "time"

type DigitalScentPassport struct {
	ID                 string    `json:"id" gorm:"primaryKey;size:64"`
	QRHash             string    `json:"qr_hash" gorm:"size:64;uniqueIndex;not null"`
	NFCTagUID          string    `json:"nfc_tag_uid,omitempty" gorm:"size:64"`
	LotNumber          string    `json:"lot_number" gorm:"size:64;index;not null"`
	BottleSerialNumber string    `json:"bottle_serial_number" gorm:"size:64;not null"` // cth: 042/200
	BrandName          string    `json:"brand_name" gorm:"size:128;not null"`
	VariantName        string    `json:"variant_name" gorm:"size:128;not null"`
	ConcentrationType  string    `json:"concentration_type" gorm:"size:64"`
	TopNotesSummary    string    `json:"top_notes_summary" gorm:"type:text"`
	HeartNotesSummary  string    `json:"heart_notes_summary" gorm:"type:text"`
	BaseNotesSummary   string    `json:"base_notes_summary" gorm:"type:text"`
	HarvestProvenance  string    `json:"harvest_provenance" gorm:"type:text"`
	MacerationDays     int       `json:"maceration_days"`
	BottledDate        time.Time `json:"bottled_date"`
	TotalScannedCount  int       `json:"total_scanned_count" gorm:"default:0"`
	IsAuthentic        bool      `json:"is_authentic" gorm:"default:true"`
	DistributorOutlet  string    `json:"distributor_outlet" gorm:"size:128"`
	CreatedAt          time.Time `json:"created_at"`
}
