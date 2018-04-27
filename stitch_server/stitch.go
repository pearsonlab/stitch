package main

import (
	"google.golang.org/grpc"
	"net"
	"log"
	pb "github.com/tom1193/stitch/stitch_proto"
	"fmt"
	"os"
	"io"
	"time"
	//"encoding/csv"
	"math"
	"github.com/tysonmote/gommap"
	//"strconv"
	"bytes"
)

const port = ":10001"
const f = "slice-mid-1000-200.tif"
const test = "mmapTest.txt"

type stitchServer struct {}

//benchmark matrics
type metrics struct{
	start time.Time
	end time.Time
}

func typeof(v interface{}) string {
	return fmt.Sprintf("%T", v)
}

func (s *stitchServer) GetImage(req *pb.Request, stream pb.Stitch_GetImageServer) (err error) {
	var (
		buf     []byte
		n       int
		file    *os.File
		//fileMetrics *os.File
		m metrics
	)
	//confirm client is connected by echoing request
	fmt.Println(req.Size)

	//Open image file for reading, mocks getting data from microscope
	file, err = os.Open(f)
	if err != nil {
		log.Fatalf("failed to open file %s", f)
	}
	defer file.Close()

	//memory map
	filemmap, err := os.Open(test)
	if err == nil {
		mmap, err := gommap.Map(filemmap.Fd(), gommap.PROT_WRITE, gommap.MAP_PRIVATE)
		if err == nil {
			end := bytes.Index(mmap, []byte("\n"))
			println(string([]byte(mmap[:end])))


		} else { fmt.Println(err) }
	}
	if err != nil {
		log.Fatalf("failed to open file %s", filemmap)
	}

	m.start = time.Now()

	byteSize := int64(math.Pow(float64(2),float64(16)))
	buf = make([]byte, byteSize)
	count :=0
	writing := true
	for writing {
		count++
		n, err = file.Read(buf)
		if err != nil {
			fmt.Println(err)
			if err == io.EOF {
				writing = false
				err = nil
				continue
			}
			log.Fatalf("error while copying file to buf: %s", err)
		}
		//send the buffer
		err = stream.Send(&pb.Image{Image: buf[:n],})
		if err != nil {
			return err
		}
	}
	file.Close()
	m.end = time.Now()

	delta := m.end.Sub(m.start).String()
	fmt.Printf("%s",delta)

	return nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	server := grpc.NewServer()
	pb.RegisterStitchServer(server, &stitchServer{})
	server.Serve(lis)
}
