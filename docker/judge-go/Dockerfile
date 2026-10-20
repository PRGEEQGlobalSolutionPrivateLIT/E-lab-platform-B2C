FROM golang:1.23-bookworm

ENV CGO_ENABLED=0 \
    GOTOOLCHAIN=local \
    GOFLAGS=-buildvcs=false \
    GOMAXPROCS=1

WORKDIR /opt/warm

RUN printf 'package main\n\nimport (\n\t"bufio"\n\t"fmt"\n\t"math"\n\t"os"\n\t"sort"\n\t"strconv"\n\t"strings"\n\t"unicode"\n)\n\nfunc main() {\n\t_ = bufio.NewReader(os.Stdin)\n\tfmt.Println(math.Sqrt(4), sort.IntsAreSorted(nil), strconv.Itoa(1), strings.TrimSpace(" "), unicode.IsLetter(97))\n}\n' > main.go \
    && GOCACHE=/opt/go-cache go build -o /tmp/warm main.go \
    && rm -rf /opt/warm /tmp/warm \
    && chmod -R a+rX /opt/go-cache

WORKDIR /workspace

CMD ["go", "version"]
