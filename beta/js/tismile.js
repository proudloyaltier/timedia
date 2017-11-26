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
     localStorage.faces = faceUrl;
     localStorage.tismileaccount = localStorage.name;
     document.getElementById('tismile-stage2').style = "display: none;";
     document.getElementById('tismile-stage3').style = "";
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

    if(isMobile.any()) {
 document.getElementById('ti-smile-app').style = "display: none;"
} else {
document.getElementById('ti-smile-app').style = ""  
}
