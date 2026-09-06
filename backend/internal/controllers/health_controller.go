package controllers

import (
	"net/http"
	"time"

	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

type HealthController struct {
	startTime time.Time
}

func NewHealthController() *HealthController {
	return &HealthController{startTime: time.Now()}
}

func (h *HealthController) Check(c *gin.Context) {
	views.RenderSuccess(c, http.StatusOK, "Racik Parfumerie OS API aktif dan berjalan normal", gin.H{
		"status":      "UP",
		"environment": "production-ready",
		"version":     "v1.0.0",
		"uptime":      time.Since(h.startTime).String(),
		"timestamp":   time.Now().Format(time.RFC3339),
	})
}
