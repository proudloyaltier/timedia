var video = document.getElementById('tismile-video');
var w = 640;
var h = 480;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

var canvas = document.getElementById('tismile-canvas');
var context = canvas.getContext('2d');

if (localStorage.faces !== undefined) {
  document.getElementById('tismile-enable').style = "display: none;";
} else {
  document.getElementById('tismile-disable').style = "display: none;";
}

function disableTiSmile() {
  localStorage.removeItem("faces");
  location.reload();
}

function setupTiSmile(stage) {
   if (stage == 0) {
     document.getElementById('tismile-main').style = "display: none;";
     document.getElementById('tismile-stage1').style = "";
   } else if (stage == 1) {
     context.drawImage(video, 0, 0, 640, 480);
     // insert pixelation code here
     window.faceUrl = canvas.toDataURL();
     document.getElementById('tismile-stage1').style = "display: none;";
     document.getElementById('tismile-stage2').style = "";
   } else if (stage == 2) {
     localStorage.faces = [faceUrl, localStorage.name];
     document.getElementById('tismile-stage2').style = "display: none;";
     document.getElementById('tismile-stage3').style = "";
   }
}
