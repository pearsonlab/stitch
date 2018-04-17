from concurrent import futures
import time
import sys
import grpc

sys.path.insert(0, '../servaiman_proto')
import servaiman_pb2
import servaiman_pb2_grpc

PORT_NUM = '[::]:50051'
_ONE_DAY_IN_SECONDS = 60 * 60 * 24

class Servaiman(servaiman_pb2_grpc.ServaimanServicer):

		def GetOut(self, request, context):
				print(request.size)
				for i in range(request.size):
					yield servaiman_pb2.CaimanOut(image=[i])
				# return servaiman_pb2.CaimanOut(image=[request.size])


def serve():
		server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
		servaiman_pb2_grpc.add_ServaimanServicer_to_server(Servaiman(), server)
		server.add_insecure_port(PORT_NUM)
		print("started")
		server.start()
		try:
				while True:
						time.sleep(_ONE_DAY_IN_SECONDS)
		except KeyboardInterrupt:
				server.stop(0)

if __name__ == '__main__':
		serve()