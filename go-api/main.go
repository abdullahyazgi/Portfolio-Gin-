package main

import (
	"api/docs"
	"api/internal/config"
	"api/internal/db"
	"api/internal/handlers"
	"api/internal/routes"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title API
// @version 1.0
// @description API for managing projects
// @host localhost:8080
// @BasePath /api
// @openapi: 3.0.0

func main() {
	cfg := config.LoadConfig()
	pool := db.Connect(cfg)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	projectHandler := handlers.NewProjectHandler(pool)
	routes.RegisterRoutes(r, projectHandler)

	// set Swagger host and base path dynamically where possible
	docs.SwaggerInfo.Host = "localhost:" + cfg.Port
	docs.SwaggerInfo.BasePath = "/api"

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Println("Server running on port", cfg.Port)
	r.Run(":" + cfg.Port)
}
