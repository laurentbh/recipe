package neo4j

import (
	"github.com/laurentbh/recipe/internal/entities/models"
	"github.com/laurentbh/whiterabbit"
)

type RepositoryNeo struct {
	db whiterabbit.DB
}

func New(db whiterabbit.DB) *RepositoryNeo {
	return &RepositoryNeo{db: db}
}
func (r *RepositoryNeo) Disconnect() error {
	return r.db.Close()
}

func (r *RepositoryNeo) FindByProperty(prop string, val string) ([]interface{}, error) {
	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	// var candidate = []interface{}{"on", "two"}
	// var candidate  []interface{}
	// candidate.append(,)
	// {models.Ingredient, models.Category}
	ret, err := con.FindByProperty(prop, val, []interface{}{
		models.Ingredient{}, models.Category{}, models.Utensil{}})

	return ret, err
}

// DeleteByID ...
func (r *RepositoryNeo) DeleteByID(id int64) error {
	con, err := r.db.GetConnection()
	if err != nil {
		return err
	}
	defer con.Close()
	return con.DeleteByID(id)
}
// CategoryCreate ...
func (r *RepositoryNeo) CategoryCreate(name string, attributes map[string]string) (models.Category, error) {
	conn, err := r.db.GetConnection()
	if err != nil {
		return models.Category{}, err
	}
	defer conn.Close()

	newCategory := models.Category{Name: name}
	if attributes != nil && len(attributes) > 0 {
		newCategory.Labels = attributes
	}
	id, _, err := conn.CreateNode(newCategory)

	if err != nil {
		return models.Category{}, err
	}

	cat := models.Category{Name: name}
	cat.SetId(id)
	return cat, nil
}

// CategoryByName ...
func (r *RepositoryNeo) CategoryByName(name string) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindNodesClause(
		models.Category{},
		map[string]interface{}{"Name": name}, whiterabbit.IgnoreCase)
	if ret != nil {
		conv, _ := ret[0].(models.Category)
		return conv, nil
	}
	return nil, nil
}

// CategoryAll ...
func (r *RepositoryNeo) CategoryAll() ([]models.Category, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	tmpRet, err := con.FindAllNodes(models.Category{})
	if err != nil {
		return nil, err
	}
	ret := make([]models.Category, len(tmpRet))
	for i := 0; i < len(tmpRet); i++ {
		ret[i] = tmpRet[i].(models.Category)
	}
	return ret, nil
}




// IngredientCreate ...
func (r *RepositoryNeo) IngredientCreate(name string, attributes map[string]string) (models.Ingredient, error) {
	conn, err := r.db.GetConnection()
	if err != nil {
		return models.Ingredient{}, err
	}
	defer conn.Close()

	newIngredient := models.Ingredient{Name: name}
	if attributes != nil && len(attributes) > 0 {
		newIngredient.Labels = attributes
	}
	id, _, err := conn.CreateNode(newIngredient)

	if err != nil {
		return models.Ingredient{}, err
	}

	newIngredient.SetId(id)
	return newIngredient, nil
}

// IngredientByName ...
func (r *RepositoryNeo) IngredientByName(name string) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindNodesClause(
		models.Ingredient{},
		map[string]interface{}{"Name": name}, whiterabbit.IgnoreCase)
	if ret != nil {
		conv, _ := ret[0].(models.Ingredient)
		return conv, nil
	}
	return nil, nil
}

// IngredientById ...
func (r *RepositoryNeo) IngredientById(id int64) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindById(id, models.Ingredient{})
	if err != nil {
		return nil, err
	}
	if ret != nil {
		conv, _ := ret.(models.Ingredient)
		return conv, nil
	}
	return nil, nil
}

// IngredientAll ...
func (r *RepositoryNeo) IngredientAll() ([]models.Ingredient, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	tmpRet, err := con.FindAllNodes(models.Ingredient{})
	if err != nil {
		return nil, err
	}
	ret := make([]models.Ingredient, len(tmpRet))
	for i := 0; i < len(tmpRet); i++ {
		ret[i] = tmpRet[i].(models.Ingredient)
	}
	return ret, nil
}

// IngredientByIdRelations ...
func (r *RepositoryNeo) IngredientByIdRelations(id int64, candidate []interface{}) ([]whiterabbit.Relation, error) {
	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	return con.RelationByNodeID(id, candidate)
}

// IgnoreCreate ...
func (r *RepositoryNeo) IgnoreCreate(name string, attributes map[string]string) (models.Ignore, error) {
	conn, err := r.db.GetConnection()
	if err != nil {
		return models.Ignore{}, err
	}
	defer conn.Close()

	n := models.Ignore{Name: name}
	if attributes != nil && len(attributes) > 0 {
		n.Labels = attributes
	}
	id, _, err := conn.CreateNode(n)

	if err != nil {
		return models.Ignore{}, err
	}

	i := models.Ignore{Name: name}
	i.SetId(id)
	return i, nil
}

// IgnoreByName ...
// func (r *RepositoryNeo) IgnoreByName(name string) (*models.Ignore, error) {
func (r *RepositoryNeo) IgnoreByName(name string) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindNodesClause(
		models.Ignore{},
		map[string]interface{}{"Name": name}, whiterabbit.IgnoreCase)
	if ret != nil {
		conv, _ := ret[0].(models.Ignore)
		return conv, nil
	}
	return nil, nil
}

// IgnoreAll ...
func (r *RepositoryNeo) IgnoreAll() ([]models.Ignore, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	tmpRet, err := con.FindAllNodes(models.Ignore{})
	if err != nil {
		return nil, err
	}
	ret := make([]models.Ignore, len(tmpRet))
	for i := 0; i < len(tmpRet); i++ {
		ret[i] = tmpRet[i].(models.Ignore)
	}
	return ret, nil
}

// MeasureByName find Measure for a given name
// will also check measure's abbreviation
func (r *RepositoryNeo) MeasureByName(name string) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindAllNodes( models.Measure{})
	if ret != nil {
		for _, r := range ret {
			m, _ := r.(models.Measure)
			if m.Name == name {
				return m, nil
			}
			for _, abbr := range m.Abbrev {
				abbr2 := abbr +"."
				if abbr == name || abbr2 == name{
					return m, nil
				}
			}
		}
	}
	return nil, nil
}
// MeasureAll ...
func (r *RepositoryNeo) MeasureAll() ([]models.Measure, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	tmpRet, err := con.FindAllNodes(models.Measure{})
	if err != nil {
		return nil, err
	}
	ret := make([]models.Measure, len(tmpRet))
	for i := 0; i < len(tmpRet); i++ {
		ret[i] = tmpRet[i].(models.Measure)
	}
	return ret, nil
}

// UtensilByName ...
func (r *RepositoryNeo) UtensilByName(name string) (models.DBEntity, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()

	ret, err := con.FindNodesClause(
		models.Utensil{},
		map[string]interface{}{"Name": name}, whiterabbit.IgnoreCase)
	if ret != nil {
		conv, _ := ret[0].(models.Utensil)
		return conv, nil
	}
	return nil, nil
}


func (r *RepositoryNeo) UtensilCreate(name string, attributes map[string]string) (models.Utensil, error) {
	conn, err := r.db.GetConnection()
	if err != nil {
		return models.Utensil{}, err
	}
	defer conn.Close()

	newUtensil := models.Utensil{Name: name}
	if attributes != nil && len(attributes) > 0 {
		newUtensil.Labels = attributes
	}
	id, _, err := conn.CreateNode(newUtensil)

	if err != nil {
		return models.Utensil{}, err
	}

	newUtensil.SetId(id)
	return newUtensil, nil
}
func (r *RepositoryNeo) UtensilAll() ([]models.Utensil, error) {

	con, err := r.db.GetConnection()
	if err != nil {
		return nil, err
	}
	defer con.Close()
	tmpRet, err := con.FindAllNodes(models.Utensil{})
	if err != nil {
		return nil, err
	}
	ret := make([]models.Utensil, len(tmpRet))
	for i := 0; i < len(tmpRet); i++ {
		ret[i] = tmpRet[i].(models.Utensil)
	}
	return ret, nil
}