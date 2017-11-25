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
