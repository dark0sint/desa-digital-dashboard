package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Serve static files (front-end)
	r.Static("/static", "./static")

	// API endpoint for submitting a service request (simulated)
	r.POST("/api/submit-request", func(c *gin.Context) {
		var request struct {
			Service string `json:"service"`
			Name    string `json:"name"`
			Details string `json:"details"`
		}
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}
		// Simulate processing (in real app, save to DB)
		c.JSON(http.StatusOK, gin.H{"message": "Request submitted successfully", "service": request.Service})
	})

	// API endpoint for fetching public services list
	r.GET("/api/services", func(c *gin.Context) {
		services := []gin.H{
			{"id": 1, "name": "Pengajuan KTP", "description": "Request for ID card"},
			{"id": 2, "name": "Surat Keterangan", "description": "Certificate requests"},
			{"id": 3, "name": "Informasi Publik", "description": "Public announcements"},
		}
		c.JSON(http.StatusOK, services)
	})

	// Default route to serve index.html
	r.GET("/", func(c *gin.Context) {
		c.File("./static/index.html")
	})

	r.Run(":8080") // Start server on port 8080
}
