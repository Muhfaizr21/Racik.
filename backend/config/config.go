package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AppEnv     string
	Port       string
	AppName    string
	JWTSecret  string
	FrontendURL string
}

func LoadConfig() *Config {
	// Load .env file if it exists
	_ = godotenv.Load()

	return &Config{
		AppEnv:     getEnv("APP_ENV", "development"),
		Port:       getEnv("PORT", "8080"),
		AppName:    getEnv("APP_NAME", "Racik Parfumerie OS API"),
		JWTSecret:  getEnv("JWT_SECRET", "super-secret-racik-vault-key-2026"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:5173"),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
