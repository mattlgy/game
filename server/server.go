package main

import (
    // "io"
    "fmt"
    "reflect"
    "net/http"
    "bytes"
	"encoding/binary"

    "golang.org/x/net/websocket"
)




// buf := new(bytes.Buffer)
// 	var pi float64 = math.Pi
// 	err := binary.Write(buf, binary.LittleEndian, pi)

// Echo the data received on the WebSocket.
func EchoServer(ws *websocket.Conn) {
    var i int32 = 42
    buf := new(bytes.Buffer)
    _ = binary.Write(buf, binary.LittleEndian, i)
    _ = websocket.Message.Send(ws, buf.Bytes())

    // var bindata = []byte{0,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,0,0}
    // _ = websocket.Message.Send(ws, bindata)
    // io.Copy(ws, ws)
}

// This example demonstrates a trivial echo server.
func main() {
    fmt.Println(reflect.TypeOf(WorldData))
    fmt.Println(WorldData)


    fs := http.FileServer(http.Dir("../assets"))
    http.Handle("/", fs)

    http.Handle("/echo", websocket.Handler(EchoServer))
    err := http.ListenAndServe(":12345", nil)
    if err != nil {
        panic("ListenAndServe: " + err.Error())
    }

}
