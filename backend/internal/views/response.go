package views

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Errors  interface{} `json:"errors,omitempty"`
}

type PaginatedResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
	Meta    Pagination  `json:"meta"`
}

type Pagination struct {
	CurrentPage int   `json:"current_page"`
	PerPage     int   `json:"per_page"`
	TotalItems  int64 `json:"total_items"`
	TotalPages  int   `json:"total_pages"`
}

func RenderSuccess(c *gin.Context, httpCode int, message string, data interface{}) {
	c.JSON(httpCode, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func RenderError(c *gin.Context, httpCode int, message string, errDetails interface{}) {
	c.JSON(httpCode, APIResponse{
		Success: false,
		Message: message,
		Errors:  errDetails,
	})
}

func RenderBadRequest(c *gin.Context, message string, errDetails interface{}) {
	RenderError(c, http.StatusBadRequest, message, errDetails)
}

func RenderNotFound(c *gin.Context, message string) {
	RenderError(c, http.StatusNotFound, message, nil)
}

func RenderUnauthorized(c *gin.Context, message string) {
	RenderError(c, http.StatusUnauthorized, message, nil)
}

func RenderForbidden(c *gin.Context, message string) {
	RenderError(c, http.StatusForbidden, message, nil)
}

func RenderInternalError(c *gin.Context, message string) {
	RenderError(c, http.StatusInternalServerError, message, nil)
}
