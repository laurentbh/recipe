package api

type Reference struct {
	Name string `json:"name"`
	Link string `json:"link"`
}

// Recipe ...
type Recipe struct {
	Id          string      `json:"id,omitempty"`
	Title       string      `json:"title,omitempty"`
	Ingredients []string    `json:"ingredients,omitempty"`
	Instruction string      `json:"instruction,omitempty"`
	TotalTime   int         `json:"total_time,omitempty"`
	PrepTime    int         `json:"prep_time,omitempty"`
	CookTime    int		    `json:"cook_time,omitempty"`
	Yield       string      `json:"yield,omitempty"`
	Tips        []string    `json:"tips,omitempty"`
	References  []Reference `json:"references,omitempty"`
}
