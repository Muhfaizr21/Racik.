package middlewares

import (
	"strings"

	"github.com/Muhfaizr21/Racik/backend/internal/models"
	"github.com/Muhfaizr21/Racik/backend/internal/views"
	"github.com/gin-gonic/gin"
)

// RequireRoles memvalidasi apakah user memiliki salah satu role yang diizinkan
func RequireRoles(allowedRoles ...models.Role) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Dapatkan role dari header X-User-Role atau dari klaim Bearer Token
		userRoleStr := c.GetHeader("X-User-Role")
		if userRoleStr == "" {
			// Cek apakah ada Bearer token simulasi
			authHeader := c.GetHeader("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				token := strings.TrimPrefix(authHeader, "Bearer ")
				// Contoh: "token-owner", "token-labtech", "token-warehouse", "token-cashier"
				parts := strings.Split(token, "-")
				if len(parts) == 2 {
					userRoleStr = strings.ToUpper(parts[1])
				}
			}
		}

		if userRoleStr == "" {
			// Default ke OWNER untuk kemudahan uji coba API lokal jika tidak ditentukan
			userRoleStr = string(models.RoleOwner)
		}

		currentRole := models.Role(userRoleStr)

		isAllowed := false
		for _, role := range allowedRoles {
			if currentRole == role {
				isAllowed = true
				break
			}
		}

		if !isAllowed {
			views.RenderForbidden(c, "Akses ditolak: role Anda ("+string(currentRole)+") tidak memiliki izin untuk modul ini")
			c.Abort()
			return
		}

		// Simpan role ke dalam context request
		c.Set("user_role", currentRole)
		c.Next()
	}
}
