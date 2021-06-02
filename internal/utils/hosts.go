package utils

import (
	"os"
	"strings"
)

// SubHostname replace the host with env variable if exists
func SubHostname(host string, env string) string  {
	if envVal, ok := os.LookupEnv(env); ok {
		// strip
		var prefixLen = 0
		if strings.HasPrefix(host, "http://") {
			prefixLen = len("http://")
		} else if strings.HasPrefix(host, "https://") {
			prefixLen = len("https://")
		}
		lastIndex := strings.LastIndex(host[prefixLen: len(host)-1], ":")
		if lastIndex == -1 {
			return host[0 : prefixLen] + envVal
		}
		return  host[0 : prefixLen] + envVal + host[lastIndex + prefixLen : len(host) ]
	}
	return host

}
