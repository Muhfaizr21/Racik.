package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/config"
	"github.com/Muhfaizr21/Racik/backend/internal/database"
	"github.com/Muhfaizr21/Racik/backend/internal/routes"
)

func main() {
	// 1. Muat Konfigurasi
	cfg := config.LoadConfig()

	log.Printf("[RACIK OS] Memulai server %s...", cfg.AppName)
	log.Printf("[RACIK OS] Environment: %s, Port: :%s", cfg.AppEnv, cfg.Port)

	// 2. Inisialisasi Database PostgreSQL (Connection Pool & Auto-Migration)
	db := database.InitPostgres(cfg)

	// 3. Inisialisasi Router MVC dengan Database Injection
	router := routes.SetupRouter(cfg, db)

	// 3. Konfigurasi HTTP Server dengan Timeout Aman
	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// 4. Jalankan Server
	log.Printf("[RACIK OS] Server siap menerima request di http://localhost:%s/api/v1/health", cfg.Port)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("[RACIK OS] Gagal menjalankan server: %v", err)
	}
}
