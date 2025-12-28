package utils

import "github.com/go-playground/validator/v10"

func ValidationError(err error) map[string]string {
	errors := make(map[string]string)

	if errs, ok := err.(validator.ValidationErrors); ok {
		for _, e := range errs {
			errors[e.Field()] = e.Tag()
		}
	}

	return errors
}

