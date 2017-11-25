var video = document.getElementById('tismile-video');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

function setupTiSmile(stage) {
   if (stage == 0) {
     document.getElementById('tismile-setup-button').style = "display: none;";
     document.getElementById('tismile-video').style = "border-radius: 30px; background-color: black;";
     document.getElementById('tismile-stage1').style = "";
   } elseif (stage == 1) {
     document.getElementById('tismile-video').style = "display: none;";
     document.getElementById('tismile-stage1').style = "display: none;";
     document.getElementById('tismile-stage2').style = "";
   } elseif (stage == 2) {
     document.getElementById('tismile-stage2').style = "display: none;";
     document.getElementById('tismile-stage3').style = "";
}
