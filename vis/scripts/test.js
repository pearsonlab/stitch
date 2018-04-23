//var ByteBuffer = require("bytebuffer");
//
//var bb = new ByteBuffer().weriteIString("input").flip();
//
//
//document.getElementById("mod_image").src="data:image/png;base64"+bb;
goog.require('proto.servaiman_proto.Request');
goog.require('proto.servaiman_proto.CaimanOut');
window.addEventListener("load", init, false);

//req.setSize(3);
//[] = cai.getImageList()

// using commonjs and the pb file
//var messages = require('./messages_pb');
//
//var message = new messages.MyMessage();

var caimanOut = proto.servaiman_proto.CaimanOut();

function init(evt) {
    "use strict";
    window.removeEventListener(evt.type, init, false);

    var streamButton = document.querySelector("#start"),
        playButton = document.querySelector("#togglePlay"),
        isStreaming = false,
        isPlaying = false;

    function startStream(evt) {
        streamButton.removeEventListener(evt.type, startStream, false);
        streamButton.addEventListener(evt.type, stopStream, false);

        streamButton.innerHTML = "Stop";

        sendMessage();

    }

    function stopStream(evt) {
        streamButton.removeEventListener(evt.type, stopStream, false);
        streamButton.addEventListener(evt.type, startStream, false);
        streamButton.innerHTML = "Start Stream";
    }

    function play(evt) {
        playButton.removeEventListener(evt.type, play, false);
        playButton.addEventListener(evt.type, pause, false);
        playButton.innerHTML = "pause";
    }

    function pause(evt) {
        playButton.removeEventListener(evt.type, pause, false);
        playButton.addEventListener(evt.type, play, false);
        playButton.innerHTML = "play";
    }

    pause({
        type: "click"
    });
    stopStream({
        type: "click"
    });
}

function drawCanvas() {
    var canvas = document.getElementById('sentImage');
    var width = canvas.width;
    var height = canvas.height;
    var cxt = canvas.getContext('2d');
    // the following two commands might have a huge effect on performance - TODO check this`
    var imageData = ctx.getImageData(0,0,width, height);
    //var data= imageData;
    // now of the type Uint8ClampedArray
    
        var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
var data = new Uint32Array(buf);
    
    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            //var index = (y * width + x) * 4; // assuming 4 channel rgba values
//            data[index] = 2; // red value
//            data[++index] = 100; // green
//            data[++index] = 150; // blue
//            data[++index] = 255; // alpha, 255 is 100% opaque
            data[y * canvasWidth + x] =
            (255   << 24) |    // alpha
            (150 << 16) |    // blue
            (100 <<  8) |    // green
             2;            // red
            // quicker to store as 32 bit array with bit shifts
//            ctx.putImageData(imageData, y, x)
        }
    }
    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
    
    // numpy arrays are row, column
}
