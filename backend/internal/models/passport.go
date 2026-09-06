package models

import "time"

type DigitalScentPassport struct {
	ID                 string    `json:"id"`
	QRHash             string    `json:"qr_hash"`              // Hash unik untuk URL verifikasi publik
	NFCTagUID          string    `json:"nfc_tag_uid,omitempty"`
	LotNumber          string    `json:"lot_number"`
	BottleSerialNumber string    `json:"bottle_serial_number"` // cth: 042/200
	BrandName          string    `json:"brand_name"`
	VariantName        string    `json:"variant_name"`
	ConcentrationType  string    `json:"concentration_type"`   // Extrait / EDP / EDT
	TopNotesSummary    string    `json:"top_notes_summary"`
	HeartNotesSummary  string    `json:"heart_notes_summary"`
	BaseNotesSummary   string    `json:"base_notes_summary"`
	HarvestProvenance  string    `json:"harvest_provenance"`
	MacerationDays     int       `json:"maceration_days"`
	BottledDate        time.Time `json:"bottled_date"`
	TotalScannedCount  int       `json:"total_scanned_count"`
	IsAuthentic        bool      `json:"is_authentic"`
	DistributorOutlet  string    `json:"distributor_outlet"`
	CreatedAt          time.Time `json:"created_at"`
}
