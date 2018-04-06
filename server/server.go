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

)

const port = ":10001"
const f = "slice-mid-1000-200.tif"
//const metricsf = "server_metrics.csv"

type stitchServer struct {}

//benchmark matrics
type metrics struct{
	start time.Time
	end time.Time
}

func (s *stitchServer) GetImage(req *pb.Request, stream pb.Stitch_GetImageServer) (err error) {
	var (
		writing = true
		buf     []byte
		n       int
		file    *os.File
		m metrics
	)
	//confirm client is connected by echoing request
	fmt.Println(req.Size)

	//Open metrics file for recording times
	//fileMetrics, err = os.Open(metricsf)
	//if err != nil {
	//	log.Fatalf("failed to open file %s", f)
	//}
	//defer file.Close()
	//writer := csv.NewWriter(fileMetrics)
	//defer writer.Flush()

	//Open image file for reading
	file, err = os.Open(f)
	if err != nil {
		log.Fatalf("failed to open file %s", f)
	}
	defer file.Close()

	m.start = time.Now()
	buf = make([]byte, 1024)
	for writing {
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
	m.end = time.Now()
	fmt.Println(m.end.Sub(m.start))

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
