package main

import (
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"net"
	"log"
	pb "github.com/tom1193/stitch/stitch_proto"
)

const port = ":10001"

type stitchServer struct {}

func (s *stitchServer) GetImage(ctx context.Context, req *pb.Request) (img *pb.Image, e error){
	return &pb.Image{req.Size}, nil
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
