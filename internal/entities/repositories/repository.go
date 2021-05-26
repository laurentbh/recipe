package repositories

import (
	"github.com/laurentbh/recipe/internal/entities/models"
	"github.com/laurentbh/whiterabbit"
)

type Repository interface {
	FindByProperty(prop string, val string) ([]interface{}, error)
	DeleteByID(id int64) error

    CategoryCreate(name string, attributes map[string]string) (models.Category, error)
	CategoryByName(name string) (models.DBEntity, error)
	CategoryAll() ([]models.Category, error)

	IngredientByName(name string) (models.DBEntity, error)
	IngredientById(id int64) (models.DBEntity, error)
	IngredientCreate(name string, attributes map[string]string) (models.Ingredient, error)
	IngredientAll() ([]models.Ingredient, error)
	IngredientByIdRelations(id int64, candidate []interface{}) ([]whiterabbit.Relation, error)

	IgnoreAll() ([]models.Ignore, error)
	IgnoreByName(name string) (models.DBEntity, error)
	IgnoreCreate(name string, attributes map[string]string) (models.Ignore, error)

	MeasureAll() ([]models.Measure, error)
	MeasureByName(name string) (models.DBEntity, error)

	UtensilAll() ([]models.Utensil, error)
	UtensilCreate(name string, attributes map[string]string) (models.Utensil, error)
	UtensilByName(name string) (models.DBEntity, error)

}
