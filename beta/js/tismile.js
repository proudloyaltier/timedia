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

function drawPixelFrame(blocksize) {
  context.drawImage(video, 0, 0, 640, 480);

  for (var x = 1; x < w; x += blocksize) {
    for (var y = 1; y < h; y += blocksize) {
      var pixel = context.getImageData(x, y, 1, 1);
      context.fillStyle = "rgb(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + ")";
      context.fillRect(x, y, x + blocksize - 1, y + blocksize - 1);
    }
  }
}

setTimeout(function() {drawPixelFrame(20);}, 0);
