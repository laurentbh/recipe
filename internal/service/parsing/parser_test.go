package parsing

import (
	"os"
	"strings"
	"sync"
	"testing"
)

func TestParseString(t *testing.T) {
	var wg sync.WaitGroup
	var ch = make(chan Info, 100)
	// 汉 is coded with 3 bytes
	input := "汉字1, one,two;:.    مرحبا,  汉字three"
	var result []Info

	go FindWords(strings.NewReader(input), ch)
	result = ChannelHelper(ch, &wg)

	expecting := []Info{
		Info{"汉字1", 0, 0},
		Info{"one", 5, 1},
		Info{"two", 9, 2},
		Info{Pos: 19, Index: 3, Word: "مرحبا"},
		Info{"汉字three", 27, 4},
	}

	for i, elt := range expecting {
		if elt != result[i] {
			t.Errorf("expecting %#v, got %#v", expecting[i], result[i])
		}
	}
}

func TestParseFile(t *testing.T) {
	var wg sync.WaitGroup
	var ch = make(chan Info, 100)
	file, _ := os.Open("./parser_testfile.txt")
	defer file.Close()

	go FindWords(file, ch)
	result := ChannelHelper(ch, &wg)

	expecting := []Info{
		Info{"one", 0, 0},
		Info{"two", 7, 1},
		Info{"three", 11, 2},
		Info{"four", 26, 3},
	}

	for i, elt := range expecting {
		if elt != result[i] {
			t.Errorf("expecting %#v, got %#v", expecting[i], result[i])
		}
	}
}
