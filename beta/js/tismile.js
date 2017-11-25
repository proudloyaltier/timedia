var video = document.getElementById('tismile-video');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

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
     document.getElementById('tismile-video').style = "display: none;";
     document.getElementById('tismile-stage1').style = "display: none;";
     document.getElementById('tismile-stage2').style = "";
   } else if (stage == 2) {
     localStorage.faces = "1";
     document.getElementById('tismile-stage2').style = "display: none;";
     document.getElementById('tismile-stage3').style = "";
   }
}

