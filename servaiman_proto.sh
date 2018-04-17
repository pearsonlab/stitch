#!/bin/bash
python -m grpc_tools.protoc -I./servaiman_proto --python_out=servaiman_proto --grpc_python_out=servaiman_proto servaiman_proto/servaiman.proto
