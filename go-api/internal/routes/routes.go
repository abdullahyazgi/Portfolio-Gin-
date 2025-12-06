package routes

import (
	"api/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, projectHandler *handlers.ProjectHandler) {
	api := r.Group("/api")
	{
		api.POST("/projects", projectHandler.AddProject)
		api.GET("/projects", projectHandler.GetProjects)
	}
}
