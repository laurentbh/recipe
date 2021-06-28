package utils

import (
	"bytes"
)

type ByTitle []map[string]interface{}

func (r ByTitle) Len() int {
	return len(r)
}
func (r ByTitle) Swap(i, j int) {
	r[i], r[j] = r[j], r[i]
}
func (r ByTitle) Less(i, j int) bool {
	if r[i]["title"] == nil && r[j]["title"] == nil {
		return true
	}
	if  r[i]["title"] == nil {
		return true
	}
	if r[j]["title"] == nil {
		return false
	}
	iTitle := []byte(r[i]["title"].(string))
	jTitle := []byte(r[j]["title"].(string))

	l := len(iTitle)
	if len(jTitle) < l {
		l = len(jTitle)
	}

	for i:=0 ; i < l; i++ {
		if ! bytes.EqualFold(iTitle[i : i+1], jTitle[i : i+1]) {
			return iTitle[i] < jTitle [i]
		}
	}

	return len(iTitle) < len(jTitle)
}

