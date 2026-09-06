package models

import "time"

type MaterialCategory string

const (
	CategoryEssence   MaterialCategory = "ESSENCE"   // Bibit konsentrat aroma
	CategorySolvent   MaterialCategory = "SOLVENT"   // Pelarut (Etanol 96%, DPG, Fixative)
	CategoryBottle    MaterialCategory = "BOTTLE"    // Botol kaca flacon (30ml, 50ml, 100ml)
	CategorySprayer   MaterialCategory = "SPRAYER"   // Atomizer pump sprayer
	CategoryPackaging MaterialCategory = "PACKAGING" // Box kemasan & label
)

type RawMaterial struct {
	ID              string           `json:"id" gorm:"primaryKey;size:64"`
	Code            string           `json:"code" gorm:"size:64;uniqueIndex;not null"` // Kode wadah / SKU
	Name            string           `json:"name" gorm:"size:191;not null"`            // Nama dagang
	Category        MaterialCategory `json:"category" gorm:"size:32;not null"`
	SpecificGravity float64          `json:"specific_gravity" gorm:"type:numeric(6,4);not null"` // Berat jenis g/ml
	StockGrams      float64          `json:"stock_grams" gorm:"type:numeric(12,2);default:0"`      // Sisa stok dalam gram
	CostPerGram     float64          `json:"cost_per_gram" gorm:"type:numeric(12,2);default:0"`    // Biaya per gram (IDR)
	SupplierName    string           `json:"supplier_name" gorm:"size:128"`
	LotNumber       string           `json:"lot_number" gorm:"size:64"`
	COANumber       string           `json:"coa_number" gorm:"size:64"`
	ExpiryDate      time.Time        `json:"expiry_date"`
	CreatedAt       time.Time        `json:"created_at"`
	UpdatedAt       time.Time        `json:"updated_at"`
}
