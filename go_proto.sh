#!/bin/bash
#regenerate go stub of stitch protocol buffer at stitch_proto/stitch.proto
export PATH=$PATH:$GOPATH/bin
protoc -I stitch_proto stitch_proto/stitch.proto --go_out=plugins=grpc:stitch_proto

