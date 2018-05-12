function generateRandString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 90; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function uploadFile() {
  window.selector = document.createElement("input");
  selector.type = "file";
  selector.setAttribute("onchange", "convertFile()");
  selector.click();
}

function convertFile() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  var key = generateRandString();
  window.dbRef.child(key).child(localStorage.name).set(CryptoJS.AES.encrypt(reader.result, localStorage.password) + "");
  var url = "index.html?app=1" + '&i=' + key;
  localStorage.recentUrl = url;
  localStorage.workToSaveTitle = document.getElementById('photosTitle').value;
  localStorage.workToSave = url;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

if (getQueryVariable("i") !== false) {
 var urlRef = window.dbRef.child(getQueryVariable("i"));
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
    });
  });
 if (contentsrc.includes("data:image")) {
      document.getElementById("tiphotos-image").src = contentsrc;
    } else if (contentsrc.includes("data:video")) {
      document.getElementById("tiphotos-image").remove();
      document.getElementById("tiphotos-video").style = "";
      document.getElementById("tiphotos-video").src = contentsrc;
    } else if (contentsrc.includes("data:audio")) {
      document.getElementById("tiphotos-image").remove();
      document.getElementById("tiphotos-video").remove();
      document.getElementById("tiphotos-audio").style = "";
      document.getElementById("tiphotos-audio").src = contentsrc;
    } 
}
