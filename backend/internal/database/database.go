package database

import (
	"log"
	"time"

	"github.com/Muhfaizr21/Racik/backend/config"
	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitPostgres(cfg *config.Config) *gorm.DB {
	dsn := cfg.GetDSN()

	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	if cfg.AppEnv == "production" {
		gormConfig.Logger = logger.Default.LogMode(logger.Error)
	}

	db, err := gorm.Open(postgres.Open(dsn), gormConfig)
	if err != nil {
		log.Fatalf("[DATABASE] Gagal terhubung ke PostgreSQL: %v", err)
	}

	// Konfigurasi Connection Pool
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("[DATABASE] Gagal mengakses pool SQL: %v", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(50)
	sqlDB.SetConnMaxLifetime(time.Hour)

	log.Printf("[DATABASE] Terhubung sukses ke PostgreSQL: %s@%s:%s/%s", cfg.DBUser, cfg.DBHost, cfg.DBPort, cfg.DBName)

	// Auto-Migrate skema tabel
	err = db.AutoMigrate(
		&models.User{},
		&models.RawMaterial{},
		&models.Formula{},
		&models.FormulaIngredient{},
		&models.BatchProduction{},
		&models.DigitalScentPassport{},
	)
	if err != nil {
		log.Fatalf("[DATABASE] Gagal melakukan AutoMigrate skema tabel: %v", err)
	}

	log.Println("[DATABASE] Migrasi skema tabel PostgreSQL berhasil dilakukan.")

	// Seed data awal jika tabel masih kosong
	SeedInitialData(db)

	return db
}

func SeedInitialData(db *gorm.DB) {
	var userCount int64
	db.Model(&models.User{}).Count(&userCount)
	if userCount > 0 {
		return // Data sudah ada
	}

	log.Println("[DATABASE] Melakukan seeding data awal industri wewangian...")

	// 1. Seed Users
	users := []models.User{
		{
			ID:        "USR-001",
			Name:      "Faiz Ramadhan (Master Perfumer)",
			Email:     "owner@racik.id",
			Role:      models.RoleOwner,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        "USR-002",
			Name:      "Budi Santoso (Lab Technician)",
			Email:     "lab@racik.id",
			Role:      models.RoleLabTech,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        "USR-003",
			Name:      "Siti Rahma (Kepala Gudang)",
			Email:     "warehouse@racik.id",
			Role:      models.RoleWarehouse,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        "USR-004",
			Name:      "Dewi Lestari (Kasir Butik)",
			Email:     "cashier@racik.id",
			Role:      models.RoleCashier,
			OutletID:  "OUTLET-SENOPATI-01",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	db.Create(&users)

	// 2. Seed Raw Materials
	materials := []models.RawMaterial{
		{
			ID:              "MAT-001",
			Code:            "ESS-BG-CAL",
			Name:            "Bergamot Calabria Cold-Pressed",
			Category:        models.CategoryEssence,
			SpecificGravity: 0.875,
			StockGrams:      4250.0,
			CostPerGram:     1850.0,
			SupplierName:    "Capua 1880 S.r.l (Italia)",
			LotNumber:       "LOT-2025-BG99",
			COANumber:       "COA-IT-48821",
			ExpiryDate:      time.Now().AddDate(1, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -2, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-002",
			Code:            "ESS-OUD-ASM",
			Name:            "Assam Agarwood (Oud CO2 Extract)",
			Category:        models.CategoryEssence,
			SpecificGravity: 0.982,
			StockGrams:      850.0,
			CostPerGram:     12500.0,
			SupplierName:    "Assam Aromatics (India)",
			LotNumber:       "LOT-2024-OUD12",
			COANumber:       "COA-IN-9092",
			ExpiryDate:      time.Now().AddDate(3, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -6, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-003",
			Code:            "SOLV-ALC-96",
			Name:            "Etanol 96% Absolute Denat Organik",
			Category:        models.CategorySolvent,
			SpecificGravity: 0.805,
			StockGrams:      48000.0, // ~60 Liter
			CostPerGram:     45.0,
			SupplierName:    "PT Molindo Raya Industrial",
			LotNumber:       "MLD-2601-DRUM4",
			COANumber:       "COA-ID-260199",
			ExpiryDate:      time.Now().AddDate(2, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -1, 0),
			UpdatedAt:       time.Now(),
		},
		{
			ID:              "MAT-004",
			Code:            "BTL-FLC-50",
			Name:            "Flacon Kaca Bening 50ml (Crimp Neck)",
			Category:        models.CategoryBottle,
			SpecificGravity: 1.0,
			StockGrams:      1240.0,
			CostPerGram:     14500.0,
			SupplierName:    "SGD Pharma",
			LotNumber:       "BTL-2026-SGD01",
			COANumber:       "N/A",
			ExpiryDate:      time.Now().AddDate(10, 0, 0),
			CreatedAt:       time.Now().AddDate(0, -1, 0),
			UpdatedAt:       time.Now(),
		},
	}
	db.Create(&materials)

	// 3. Seed Master Formula
	formula := models.Formula{
		ID:                     "FML-SANTAL-01",
		Code:                   "RCK-SNT-EXT",
		Name:                   "Santal Royale Extrait",
		Version:                "v2.1",
		ConcentrationPct:       24.0,
		ConcentrationType:      "Extrait de Parfum",
		MacerationTargetDays:   32,
		EstimatedCostPerBottle: 90800,
		IsLocked:               true,
		CreatedBy:              "Faiz Ramadhan (Master Perfumer)",
		CreatedAt:              time.Now().AddDate(0, -1, 0),
		UpdatedAt:              time.Now(),
		Ingredients: []models.FormulaIngredient{
			{
				FormulaID:       "FML-SANTAL-01",
				MaterialID:      "MAT-001",
				MaterialName:    "Bergamot Calabria Cold-Pressed",
				ContainerCode:   "WADAH-TOP-01",
				Layer:           models.LayerTop,
				Percentage:      6.0,
				TargetWeightG:   52.2,
				SpecificGravity: 0.875,
			},
			{
				FormulaID:       "FML-SANTAL-01",
				MaterialID:      "MAT-002",
				MaterialName:    "Assam Agarwood (Oud CO2 Extract)",
				ContainerCode:   "WADAH-BAS-01",
				Layer:           models.LayerBase,
				Percentage:      5.0,
				TargetWeightG:   49.0,
				SpecificGravity: 0.982,
			},
			{
				FormulaID:       "FML-SANTAL-01",
				MaterialID:      "MAT-003",
				MaterialName:    "Etanol 96% Absolute Denat Organik",
				ContainerCode:   "DRUM-SOLVENT-01",
				Layer:           models.LayerSolvent,
				Percentage:      76.0,
				TargetWeightG:   611.8,
				SpecificGravity: 0.805,
			},
		},
	}
	db.Create(&formula)

	// 4. Seed Batch Production
	batch := models.BatchProduction{
		ID:                     "BATCH-001",
		LotNumber:              "LOT-202609-SNT-01",
		FormulaID:              "FML-SANTAL-01",
		FormulaName:            "Santal Royale Extrait",
		TargetVolumeLiters:     10.0,
		VatTankNumber:          "VAT-STAINLESS-04",
		Status:                 models.BatchStatusMacerating,
		MacerationDaysProgress: 18,
		MacerationDaysTarget:   32,
		EvaporationLossPct:     1.44,
		HarvestVolumeLiters:    9.85,
		FinishedBottlesCount:   197,
		BottleSizeMl:           50,
		OperatorID:             "USR-002",
		CreatedAt:              time.Now().AddDate(0, 0, -18),
		UpdatedAt:              time.Now(),
	}
	db.Create(&batch)

	// 5. Seed Digital Scent Passport
	passport := models.DigitalScentPassport{
		ID:                 "PSP-001",
		QRHash:             "2609-EDP-042",
		NFCTagUID:          "04:7F:4B:99:C2:A1:80",
		LotNumber:          "LOT-202609-SNT-01",
		BottleSerialNumber: "042/200",
		BrandName:          "MAISON DE PARFUM",
		VariantName:        "Santal Royale Extrait",
		ConcentrationType:  "Extrait de Parfum (24% Concentree)",
		TopNotesSummary:    "Bergamot Reggio Calabria, Pink Pepper CO2",
		HeartNotesSummary:  "Rosa Damascena Absolute, Orris Butter",
		BaseNotesSummary:   "Assam Oud, Mysore Sandalwood Oil, Ambroxan",
		HarvestProvenance:  "Calabria (Italia) & Mysore (India) - Panen 2025",
		MacerationDays:     32,
		BottledDate:        time.Date(2026, 2, 18, 0, 0, 0, 0, time.UTC),
		TotalScannedCount:  1,
		IsAuthentic:        true,
		DistributorOutlet:  "Official Flagship Butik Senopati Jakarta",
		CreatedAt:          time.Now(),
	}
	db.Create(&passport)

	log.Println("[DATABASE] Seeding data awal berhasil disimpan ke PostgreSQL!")
}
