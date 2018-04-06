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
	//"strconv"
)

const port = ":10001"
const f = "slice-mid-1000-200.tif"
const metricsf = "server_metrics.csv"

type stitchServer struct {}

//benchmark matrics
type metrics struct{
	start time.Time
	end time.Time
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

	//Open metrics file for recording times
	//fileMetrics, err = os.Open(metricsf)
	//if err != nil {
	//	log.Fatalf("failed to create file %s", metricsf)
	//}
	//defer fileMetrics.Close()
	//
	//writer := csv.NewWriter(fileMetrics)
	//defer writer.Flush()

	//Open image file for reading
	file, err = os.Open(f)
	if err != nil {
		log.Fatalf("failed to open file %s", f)
	}
	defer file.Close()

	//for i:=4; i<22; i++{
	writing := true
	byteSize := int64(math.Pow(float64(2),float64(16)))
	//start timing
	m.start = time.Now()
	buf = make([]byte, byteSize)

	//Open image file for reading
	file, err = os.Open(f)
	if err != nil {
		log.Fatalf("failed to open file %s", f)
	}
	count :=0
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

		//record time for byte size
		//s := m.end.Sub(m.start).Nanoseconds()
		//a := []string{strconv.FormatInt(s, 10)}
		//if err = writer.Write(a); err != nil {
		//	log.Fatal("failed to write to file %s", err)
		//}

	//}
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
