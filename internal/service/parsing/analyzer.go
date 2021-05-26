package parsing

import (
	"github.com/laurentbh/recipe/internal/entities/models"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"strings"
	"unicode"

	"github.com/jinzhu/inflection"
	"github.com/rs/zerolog/log"
)

// Analyzed composed with Info
type Analyzed struct {
	Info
	Identified bool
	Entity     string
	ID         int64
}

func getWord(buf []Info, entries int) string {
	var ret string
	i := 0
	for i < entries {
		if i < len(buf) {
			ret = ret + buf[i].Word + " "
		}
		i++
	}
	return strings.TrimSpace(ret)
}

func mustBypass(in Info) bool {
	for _, a := range in.Word {
		if unicode.IsSymbol(a) || unicode.IsNumber(a) {
			return true
		}
	}
	// _, err := strconv.ParseFloat(in.Word, 64)
	// if ()
	return false
}

// AnalyzeWords converts channel of Info to channel of Analyzed
func AnalyzeWords(db repositories.Repository, in <-chan Info, out chan<- Analyzed) error {
	var buf []Info
	nbEntries := 1
	defer close(out)
	for {
		info, more := <-in

		if mustBypass(info) && more {
			out <- Analyzed{Info: info, Identified: true, Entity: models.Bypass}
		} else if more {
			buf = append(buf, info)
			testWord := inflection.Singular(getWord(buf, nbEntries))
			a, _ := findInDb(db, testWord)
			if a.Identified {
				// push identified word
				a.Info = buf[0]
				a.Info.Word = testWord
				out <- a
				// clean buffer
				c := 0
				for c < nbEntries {
					if len(buf) > 0 {
						buf = buf[1:]
					}
					c++
				}
				nbEntries = 1
			} else {
				if nbEntries == 2 {
					out <- Analyzed{Info: buf[0], Identified: false}
					buf = buf[1:]
					nbEntries = 1
				} else {
					nbEntries++
				}
			}
		} else {
			for len(buf) > 0 {
				a, _ := findInDb(db, buf[0].Word)
				a.Info = buf[0]
				out <- a
				buf = buf[1:]
			}
			return nil
		}
	}
}

func findInEntity(value string, fp func(string) (models.DBEntity, error)) (Analyzed, error) {
	ret, err := fp(value)
	if err != nil {
		return Analyzed{}, err
	}
	if ret != nil {
		return Analyzed{Identified: true, Entity: ret.Domain(), ID: ret.Id()}, nil
	}
	return Analyzed{Identified: false}, nil
}
func findInDb(db repositories.Repository, word string) (Analyzed, error) {
	log.Debug().Str("input", word).Msg("findInDb")
	var fns []func(string) (models.DBEntity, error)

	fns = append(fns, db.IgnoreByName)
	fns = append(fns, db.IngredientByName)
	fns = append(fns, db.CategoryByName)
	fns = append(fns, db.UtensilByName)
	fns = append(fns, db.MeasureByName)

	for _, f := range fns {
		a, err := findInEntity(word, f)
		if err != nil {
			log.Error().Err(err).Msgf("calling ByName function")
			return a, err
		}
		if a.Identified {
			return a, nil
		}
	}
	return Analyzed{Identified: false}, nil
}

func isIgnore(db repositories.Repository, word Info) (Analyzed, error) {
	ret, err := db.IgnoreByName(word.Word)
	if err != nil {
		return Analyzed{}, err
	}
	analyzed := Analyzed{Info: word}
	if ret == nil {
		analyzed.Identified = false
	} else {
		analyzed.Identified = true
		e, id := "Ignore", ret.Id()
		analyzed.Entity = e
		analyzed.ID = id
	}
	return analyzed, nil
}
func isIngredient(db repositories.Repository, word Info) (Analyzed, error) {
	ret, err := db.IngredientByName(word.Word)
	if err != nil {
		return Analyzed{}, err
	}
	analyzed := Analyzed{Info: word}
	if ret == nil {
		analyzed.Identified = false
	} else {
		analyzed.Identified = true
		e, id := "Ingredient", ret.Id()
		analyzed.Entity = e
		analyzed.ID = id
	}
	return analyzed, nil
}
func isCategory(db repositories.Repository, word Info) (Analyzed, error) {
	ret, err := db.CategoryByName(word.Word)
	if err != nil {
		return Analyzed{}, err
	}
	analyzed := Analyzed{Info: word}
	if ret == nil {
		analyzed.Identified = false
	} else {
		analyzed.Identified = true
		e, id := "Category", ret.Id()
		analyzed.Entity = e
		analyzed.ID = id
	}
	return analyzed, nil
}
