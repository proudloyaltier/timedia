var canvas = document.getElementById('tismile-canvas');
var context = canvas.getContext('2d');
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
  document.getElementById('login-user').style = "display: none;";
  document.getElementById('login-tismile').style = "";
}

function loginPassword() {
  document.getElementById('login-tismile').style = "display: none;";
  document.getElementById('login-user').style = "";
}

function checkFaces() {
  context.drawImage(video, 0, 0, 640, 480);
  window.faceToCompare = canvas.toDataUrl();
  
  if (localStorage.faces.includes(faceToCompare)) {
    localStorage.name = localStorage.tismileaccount;
    localStorage.access = btoa(localStorage.name);
    window.location.href = "index.html";
  }
}

setInterval(checkFaces, 250);
