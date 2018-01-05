var pixelation = 100 - Number(localStorage.security);
var imgObj = new Image();
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
  document.getElementById('login-username').value = localStorage.tismileaccount;
  document.getElementById('login-password').focus();
}

function checkFaces() {
  context.drawImage(video, 0, 0, 640, 480);
  pixelate(context, 640, 480, 0, 0);
  window.faceToCompare = canvas.toDataURL();
  
  if (localStorage.faces == faceToCompare) {
    console.log("Unlocked!");
    localStorage.name = localStorage.tismileaccount;
    localStorage.access = btoa(localStorage.name);
    window.location.href = "index.html";
  }
}

function pixelate(context, srcWidth, srcHeight, xPos, yPos) {

  var sourceX = xPos,
    sourceY = yPos,
    imageData = context.getImageData(sourceX, sourceY, srcWidth, srcHeight),
    data = imageData.data;

  for (var y = 0; y < srcHeight; y += pixelation) {
    for (var x = 0; x < srcWidth; x += pixelation) {

      var red = data[((srcWidth * y) + x) * 4],
        green = data[((srcWidth * y) + x) * 4 + 1],
        blue = data[((srcWidth * y) + x) * 4 + 2];

      for (var n = 0; n < pixelation; n++) {
        for (var m = 0; m < pixelation; m++) {
          if (x + m < srcWidth) {
            data[((srcWidth * (y + n)) + (x + m)) * 4] = red;
            data[((srcWidth * (y + n)) + (x + m)) * 4 + 1] = green;
            data[((srcWidth * (y + n)) + (x + m)) * 4 + 2] = blue;
          }
        }
      }
    }
  }

  // overwrite original image
  context.putImageData(imageData, xPos, yPos);
  pixelation -= 1;
}

function preventHacking() {
  sessionStorage.sehkwjhahjkjhkjadshkadskhjasjkhkadshjkhjkasdhjkasdhjkhjadsjhkhjkadshjkadshjkasdhkjasdhkjasdh = logins;
}
  
setInterval(checkFaces, 250);
