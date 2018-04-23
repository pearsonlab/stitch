//goog.require('proto.servaiman_proto.Request');
//goog.require('proto.servaiman_proto.CaimanOut');

window.addEventListener("load", init, false);

//var caimanOut = proto.servaiman_proto.CaimanOut();

function init(evt) {
    "use strict";
    window.removeEventListener(evt.type, init, false);

    var streamButton = document.querySelector("#start");

    function startStream(evt) {
        streamButton.removeEventListener(evt.type, startStream, false);
        streamButton.addEventListener(evt.type, stopStream, false);

        streamButton.innerHTML = "Stop";

        var size = 1;
        //        sendMessage(size);

    }

    function stopStream(evt) {
        streamButton.removeEventListener(evt.type, stopStream, false);
        streamButton.addEventListener(evt.type, startStream, false);
        streamButton.innerHTML = "Start Stream";
    }

    stopStream({
        type: "click"
    });
}

function sendMessage(size) {
    var msg = proto.servaiman_proto.Request.prototype.setSize(size);
    var req = proto.servaiman_proto.Request.toObject(false, msg);
}

function drawCanvas() {
    var canvas = document.getElementById('sentImage');
    // likely want to get height and width from proto
    var width = canvas.width;
    var height = canvas.height;
    var imageList = proto.servaiman_proto.CaimanOut.prototype.getImageList();

    var ctx = canvas.getContext('2d');
    // the following two commands might have a huge effect on performance - TODO check this`
    var imageData = ctx.getImageData(0, 0, width, height);
    // now of the type Uint8ClampedArray
    //var ByteBuffer = require("bytebuffer");
    //var bb = new ByteBuffer().weriteIString("input").flip();
    //document.getElementById("mod_image").src="data:image/png;base64"+bb;

    var buf = new ArrayBuffer(imageData.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var data = new Uint32Array(buf);
    //    var data = imageData.data;

    var i = 0;
    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            try {
                //                data[y * width + x] =
                //            (255   << 24) |    // alpha
                //            (150 << 16) |    // blue
                //            (100 <<  8) |    // green
                //             2;            // red
                // quicker to store as 32 bit array with bit shifts
                //            ctx.putImageData(imageData, y, x)
                data[y * width + x] = imageList[i++];
            } catch (Error) {
                break;
            }
        }
    }
    imageData.data.set(buf8);
    ctx.putImageData(imageData, 0, 0);
    // numpy arrays are row, column
}
