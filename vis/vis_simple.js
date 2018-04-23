var protobuf = require("protobufjs");
// https://github.com/dcodeIO/protobuf.js/blob/master/README.md
var ByteBuffer = require("bytebuffer");
// https://github.com/dcodeIO/ByteBuffer.js

//var builder = pb.loadProtoFile("../Servaiman_proto_file");
//Vis = builder.build('vis'),
//    req = Vis.Request;
// package placeholder name is 'vis'

var messages = require('../servaiman_proto/servaiman_pb');
var req = new messages.Request();
var cai = new messages.CaimanOut();

PORT_NUM = ':50051'

protobuf.load("../Servaiman_proto_file/servaiman.proto", function(err, root) {
    if (err)
        throw err;
    
    var Req = root.lookupType("Request");
    // packagename.Request
    
    var input = {size: 1};
    if(errMessage)
        throw Error(errMessage);
    
    var message = Req.create(message);
    
    var buffer = Req.encode(message).finish();
    // encodes into Uint8Array
    
    var Cai = root.lookupType("CaimanOut");
    var dmessage = Cai.decode(buffer);
});

function rpcImpl(method, requestData, callback){
    
}


function send() {
    var size = 1;
    var message = req.create({size: size});
    var err = req.verify(message);
    if(err)
        throw Error(err);
    var buffer = req.encode(message).finish();
}
function receive(){
     try {
  var decodedMessage = cai.decode(buffer);
} catch (e) {
    if (e instanceof protobuf.util.ProtocolError) {
      // e.instance holds the so far decoded message with missing required fields
    } else {
      // wire format is invalid
    }
}

function run() {
    channel = grpc.insecure_channel('localhost' + PORT_NUM);
    
   
}
    
} 


if __name__ == '__main__' {
    run();
}