package models

type Project struct {
	ID          string `json:"id"`
	Title       string `json:"title" binding:"required,min=3,max=100"`
	Description string `json:"description" binding:"required,min=5,max=500"`
}
