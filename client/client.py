import sys
import grpc
import timeit
from functools import partial

sys.path.insert(0, '../stitch_proto')
import stitch_pb2
import stitch_pb2_grpc

def run():
	#connect to server
	channel = grpc.insecure_channel('localhost:10001')
	stub = stitch_pb2_grpc.StitchStub(channel)
	times = timeit.Timer(partial(write, stub = stub)).repeat(repeat = 2, number = 5)
	print(min(times)/5)
	
def write(stub):
	#make request, get back stream
	responses = stub.GetImage(stitch_pb2.Request(size=5))
	#write chunks to file
	f = open("slice-mid-1000-200.tif", "wb")
	for response in responses:
		f.write(response.image)
	f.close()

if __name__ == '__main__':
	# times = timeit.Timer("run()", setup="from __main__ import run").repeat(repeat = 2, number = 5)
	# print(min(times)/5)
	run()
		