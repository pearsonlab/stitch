//var ByteBuffer = require("bytebuffer");
//
//var bb = new ByteBuffer().weriteIString("input").flip();
//
//
//document.getElementById("mod_image").src="data:image/png;base64"+bb;


window.addEventListener("load", init, false);

function init(evt) {
    "use strict";
    window.removeEventListener(evt.type, init, false);
    
    var streamButton = document.querySelector("#start"),
        playButton = document.querySelector("#togglePlay"),
        isStreaming = false,
        isPlaying = false;
    
    function startStream(evt){
        streamButton.removeEventListener(evt.type, startStream, false);
        streamButton.addEventListener(evt.type, stopStream, false);
        
        streamButton.innerHTML= "Stop";
        
        sendMessage();
        
    }
    
    function stopStream(evt){
        streamButton.removeEventListener(evt.type, stopStream, false);
        streamButton.addEventListener(evt.type, startStream, false);
        streamButton.innerHTML="Start Stream";
    }
    
    function play(evt){
        playButton.removeEventListener(evt.type, play, false);
        playButton.addEventListener(evt.type, pause, false);
        playButton.innerHTML= "pause";
    }
    function pause(evt){
        playButton.removeEventListener(evt.type, pause, false);
        playButton.addEventListener(evt.type, play, false);
        playButton.innerHTML="play";
    }
    
    pause({
        type:"click"
    });
    stopStream({
        type:"click"
    });
}


