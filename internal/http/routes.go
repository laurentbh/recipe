package http

// InitRoutes set all REST routes
func (s *Server) InitRoutes() {
	s.Router.GET("/ingredients", s.AllIngredients)
	s.Router.POST("/ingredients", s.NewIngredient)
	s.Router.GET("/ingredients/:id", s.GetIngredient)

	s.Router.GET("/ingredients/:id/relations", s.GetIngredientRelations)
	s.Router.DELETE("/ingredients/:id", s.DeleteIngredient)

	s.Router.GET("/categories", s.AllCategories)
	s.Router.POST("/categories", s.NewCategory)
	s.Router.DELETE("/categories/:id", s.DeleteCategory)

	s.Router.GET("/utensils", s.AllUtensils)
	s.Router.POST("/utensils", s.NewUtensil)
	s.Router.DELETE("/utensils/:id", s.DeleteUtensil)

	s.Router.GET("/measures", s.AllMeasures)

	s.Router.POST("/recipe", s.NewRecipe)
	s.Router.GET("/recipe", s.SearchRecipe)
	s.Router.GET("/recipe/:id", s.RecipeById)
	s.Router.PUT("/recipe/:id", s.UpdateRecipe)
	s.Router.DELETE("/recipe/:id", s.DeleteRecipe)

	s.Router.POST("/recipe/image", s.UploadImage)
	s.Router.POST("/recipe/images", s.UploadImages)

	s.Router.GET("/live", s.Live)
}
