from __future__ import print_function

import sys
import grpc

sys.path.insert(0, '../stitch_proto')
import stitch_pb2
import stitch_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:10001')
    stub = stitch_pb2_grpc.StitchStub(channel)
    response = stub.GetImage(stitch_pb2.Request(size=5))
    print(str(response.image))

if __name__ == '__main__':
    run()