function generateRandString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 90; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function uploadPhoto() {
  window.selector = document.createElement("input");
  selector.type = "file";
  selector.setAttribute("onchange", "convertPhoto()");
  selector.click();
}

function convertPhoto() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  var key = generateRandString();
  storeInDatabase(key, CryptoJS.AES.encrypt(reader.result, localStorage.password) + "");
  var url = "index.html?app=1" + '&i=' + key;
  localStorage.recentUrl = url;
  localStorage.workToSaveTitle = selector.value.split(/(\\|\/)/g).pop()
  localStorage.workToSave = url;
  swal("Uploaded","Your photo has been uploaded","success").then((value) => {
  window.location.href = "?app=7"
  });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function viewPhotos(i) {
var urlRef = window.dbRef.child(localStorage.files.split(",")[i].split("&i=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
     if (contentsrc.includes("data:image")) {
      swal('<img id="tiphotos-image" width="500px">');
      var ti_photos_reader = new FileReader();
       ti_photos_reader.onloadend = function() {
         document.getElementById("tiphotos-image").src = ti_photos_reader.result;
       }
       ti_photos_reader.readAsDataURL(contentsrc);
       //document.getElementById("tiphotos-image").src = contentsrc;
    } else if (contentsrc.includes("data:video")) {
      swal('<video id="tiphotos-video" controls></video>');
      document.getElementById("tiphotos-video").src = contentsrc;
    } else if (contentsrc.includes("data:audio")) {
      swal('<audio id="tiphotos-audio" controls></audio>');
      document.getElementById("tiphotos-audio").src = contentsrc;
    } 
    });
  });
}
