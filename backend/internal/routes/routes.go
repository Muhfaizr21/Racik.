package routes

import (
	"github.com/Muhfaizr21/Racik/backend/config"
	"github.com/Muhfaizr21/Racik/backend/internal/controllers"
	"github.com/Muhfaizr21/Racik/backend/internal/middlewares"
	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/services"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRouter(cfg *config.Config, db *gorm.DB) *gin.Engine {
	if cfg.AppEnv == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middlewares.CORSMiddleware(cfg.FrontendURL))

	// Dependency Injection
	calcService := services.NewCalculationService()
	formulaService := services.NewFormulaService(db, calcService)

	healthCtrl := controllers.NewHealthController()
	authCtrl := controllers.NewAuthController()
	formulaCtrl := controllers.NewFormulaController(formulaService, calcService)
	materialCtrl := controllers.NewRawMaterialController(db)
	batchCtrl := controllers.NewBatchController(db)
	passportCtrl := controllers.NewPassportController(db)

	api := r.Group("/api/v1")
	{
		// 1. Endpoint Publik & Monitoring
		api.GET("/health", healthCtrl.Check)

		// 2. Autentikasi & Akun
		auth := api.Group("/auth")
		{
			auth.POST("/login", authCtrl.Login)
			auth.GET("/roles", authCtrl.GetRolesList)
		}

		// 3. Endpoint Publik Konsumen (Scan Digital Scent Passport QR)
		passport := api.Group("/passport")
		{
			passport.GET("/verify/:hash", passportCtrl.VerifyByHash)
		}

		// 4. Modul Formulasi & Laboratorium (Owner & Lab Technician)
		formulas := api.Group("/formulas")
		formulas.Use(middlewares.RequireRoles(models.RoleOwner, models.RoleLabTech))
		{
			formulas.GET("", formulaCtrl.ListFormulas)
			formulas.GET("/:id", formulaCtrl.GetFormulaDetail)
			formulas.GET("/calculate-batch", formulaCtrl.CalculateBatchProjection)
		}

		// 5. Modul Inventori Gudang & Bahan Baku (Warehouse & Owner)
		materials := api.Group("/materials")
		materials.Use(middlewares.RequireRoles(models.RoleWarehouse, models.RoleOwner))
		{
			materials.GET("", materialCtrl.ListMaterials)
			materials.GET("/low-stock", materialCtrl.GetLowStockAlerts)
		}

		// 6. Modul Batch Produksi & Maserasi Vat (Lab Tech & Owner)
		batches := api.Group("/batches")
		batches.Use(middlewares.RequireRoles(models.RoleLabTech, models.RoleOwner))
		{
			batches.GET("", batchCtrl.ListBatches)
			batches.GET("/:id", batchCtrl.GetBatchDetail)
		}
	}

	return r
}
