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
	ID              string           `json:"id"`
	Code            string           `json:"code"`             // Kode wadah / SKU (cth: ESS-BG-01)
	Name            string           `json:"name"`             // Nama dagang (cth: Bergamot Calabria Cold-Pressed)
	Category        MaterialCategory `json:"category"`
	SpecificGravity float64          `json:"specific_gravity"` // Berat jenis g/ml (cth: 0.875)
	StockGrams      float64          `json:"stock_grams"`      // Sisa stok dalam gram
	CostPerGram     float64          `json:"cost_per_gram"`    // Biaya per gram (IDR)
	SupplierName    string           `json:"supplier_name"`
	LotNumber       string           `json:"lot_number"`
	COANumber       string           `json:"coa_number"`
	ExpiryDate      time.Time        `json:"expiry_date"`
	CreatedAt       time.Time        `json:"created_at"`
	UpdatedAt       time.Time        `json:"updated_at"`
}
