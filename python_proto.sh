#!/bin/bash
#regenerate python stub of stitch protocol buffer at stitch_proto/stitch.proto
python -m grpc_tools.protoc -I stitch_proto --python_out=stitch_proto --grpc_python_out=stitch_proto stitch_proto/stitch.proto
