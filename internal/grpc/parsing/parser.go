package parsing

import (
	"fmt"
	"io"
	"strings"
	"sync"
	"unicode"
	"unicode/utf8"
)

type Parser interface {
	FindWords() []string
}

type StringParser string

type Info struct {
	Word  string
	Pos   int
	Index int
}

func ChannelHelper(ch <-chan Info, wg *sync.WaitGroup) []Info {
	// defer wg.Done()

	var ret []Info
	for i := range ch {
		fmt.Println("received: ", i)
		ret = append(ret, i)
	}
	return ret
}
func FindWords(r io.Reader, ch chan<- Info) {

	defer close(ch)
	var words []Info
	var sb strings.Builder
	var pos int
	var index int
	var wordStart int

	const BUFSIZE = 40

	buf := make([]byte, BUFSIZE)
	// realBuf is what is left from previous read + current read
	realBuf := make([]byte, 0, BUFSIZE+4)
	for {
		n, err := r.Read(buf)
		realBuf = append(realBuf, buf[:n]...)

		var byteParsed int

		for utf8.FullRune(realBuf) {
			r, runeSize := utf8.DecodeRune(realBuf)
			realBuf = realBuf[runeSize:]
			byteParsed += runeSize

			pos++
			if unicode.IsSpace(r) || unicode.IsPunct(r) {
				if sb.Len() > 0 {
					words = append(words, Info{Word: sb.String(), Pos: wordStart, Index: index})
					ch <- Info{Word: sb.String(), Pos: wordStart, Index: index}
					index++
				}
				wordStart = pos
				sb.Reset()
			} else {
				sb.WriteRune(r)
			}
		}

		if err == io.EOF {
			if sb.Len() > 0 {
				words = append(words, Info{Word: sb.String(), Pos: wordStart, Index: index})
				ch <- Info{Word: sb.String(), Pos: wordStart, Index: index}
			}
			break
		}
	}

}

func (stringParser StringParser) FindWords() []string {
	var words []string
	var sb strings.Builder

	for _, rune := range stringParser {
		if unicode.IsSpace(rune) || unicode.IsPunct(rune) {
			if sb.Len() > 0 {
				words = append(words, sb.String())
			}
			sb.Reset()
		} else {
			sb.WriteRune(rune)
		}
	}
	if sb.Len() > 0 {
		words = append(words, sb.String())
	}

	return words
}

func isSeparator(val rune, separators []rune) bool {
	for _, r := range separators {
		if r == val {
			return true
		}
	}
	return false
}
