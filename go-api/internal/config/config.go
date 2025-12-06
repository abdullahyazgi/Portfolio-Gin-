package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port    string
	DBHost  string
	DBPort  string
	DBUser  string
	DBPass  string
	DBName  string
	SSLMode string
}

func LoadConfig() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	return &Config{
		Port:    os.Getenv("PORT"),
		DBHost:  os.Getenv("DB_HOST"),
		DBPort:  os.Getenv("DB_PORT"),
		DBUser:  os.Getenv("DB_USER"),
		DBPass:  os.Getenv("DB_PASSWORD"),
		DBName:  os.Getenv("DB_NAME"),
		SSLMode: os.Getenv("SSL_MODE"),
	}
}
