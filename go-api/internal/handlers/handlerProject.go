package handlers

import (
	"context"
	"net/http"

	"api/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProjectHandler struct {
	DB *pgxpool.Pool
}

func NewProjectHandler(db *pgxpool.Pool) *ProjectHandler {
	return &ProjectHandler{DB: db}
}

// Add Project

// AddProject godoc
// @Summary Create a new project
// @Tags Projects
// @Accept json
// @Produce json
// @Param project body models.Project true "Project payload"
// @Success 201 {object} models.Project
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /projects [post]
func (h *ProjectHandler) AddProject(c *gin.Context) {
	var project models.Project

	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `
		INSERT INTO projects (title, description)
		VALUES ($1, $2)
		RETURNING id
	`

	err := h.DB.QueryRow(
		context.Background(),
		query,
		project.Title,
		project.Description,
	).Scan(&project.ID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, project)
}

// Get All Projects

// GetProjects godoc
// @Summary List all projects
// @Tags Projects
// @Produce json
// @Success 200 {array} models.Project
// @Failure 500 {object} map[string]string
// @Router /projects [get]
func (h *ProjectHandler) GetProjects(c *gin.Context) {
	rows, err := h.DB.Query(context.Background(),
		"SELECT id, title, description FROM projects",
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var projects []models.Project

	for rows.Next() {
		var p models.Project
		rows.Scan(&p.ID, &p.Title, &p.Description)
		projects = append(projects, p)
	}

	c.JSON(http.StatusOK, projects)
}
