var imgObj = new Image();
var video = document.getElementById('tismile-video');
var w = 640;
var h = 480;

var canvas = document.getElementById('tismile-canvas');
var context = canvas.getContext('2d');

if (getQueryVariable("app") == 11) {
  if (localStorage.faces !== undefined) {
    document.getElementById('tismile-enable').style = "display: none;";
  } else {
    document.getElementById('tismile-disable').style = "display: none;";
  }
  
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
  }
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
     document.getElementById('tismile-stage1').style = "display: none;";
     document.getElementById('tismile-stage2').style = "";
   } else if (stage == 2) {
     alertify
      .defaultValue("")
      .prompt("Please enter your password",
      function (val) {
          if (MD5(val) == localStorage.tismilepassword) {
          localStorage.security = Number(document.getElementById('tismile-security').value);
          window.pixelation = 100 - Number(localStorage.security);
          pixelate(context, 640, 480, 0, 0);
          localStorage.faces = canvas.toDataURL();
          localStorage.tismileaccount = localStorage.name;
          localStorage.tismileaccountpassword = val;
          document.getElementById('tismile-stage2').style = "display: none;";
          document.getElementById('tismile-stage3').style = "";
        } else {
          swal("Error", "Password is incorrect", "error");
          setupTiSmile(2);
        }
      })
   }
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (isMobile.any()) {
  document.getElementById('ti-smile-settings-text').style = "display: none;";
  document.getElementById('slides-new-menu').style = "display: none;";
  localStorage.tileDeleteButton = true;
  localStorage.slidesMobile = true;
} else {
  document.getElementById('ti-smile-settings-text').style = "";
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
