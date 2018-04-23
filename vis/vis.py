from __future__ import print_function
import sys
import grpc

sys.path.insert(0, '../servaiman_proto')
import servaiman_pb2
import servaiman_pb2_grpc

PORT_NUM = ':50051'

width = 250
height = 250

def run():
    channel = grpc.insecure_channel('localhost' + PORT_NUM)
    stub = servaiman_pb2_grpc.ServaimanStub(channel)
    print("hi")
    responses = stub.GetOut(servaiman_pb2.Request(size=10))
    print("ya")
    for response in responses:
        #print("received: " + str(response.image[0]))
        print("received")
    # print("recieved one")

if __name__ == '__main__':
    run()
