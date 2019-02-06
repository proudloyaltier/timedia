function submitApp() {
  var appName = document.getElementById("newapp-name").value;
  var appSource = document.getElementById("newapp-source").value;
  var appjs = document.getElementById("newapp-source-js").value;
  var appIcon = document.getElementById("newapp-icon").value;
  var data = "<ticon style='display: none;'>" + appIcon + "</ticon>" + appSource + "<script>" + appjs + "</script>";
  var a = document.createElement("a");
  a.href = "data:application/octet-stream;charset=utf-8;base64," + btoa(data);
  a.download = appName + ".tiapp";
  a.click();
}

function updateIcon() {
  document.getElementById("newapp-preview").innerHTML = "Preview: <span class='glyphicon glyphicon-" + document.getElementById("newapp-icon").value + "'></span>";
}

function uploadApp() {
 alertify.confirm("Opening apps download from the internet can be dangerous! Are you sure you want to continue?", function () {
    window.selector = document.createElement("input");
    selector.type = "file";
    selector.setAttribute("onchange", "uploadTIAPP()");
    selector.click();
   }, function() {
    return false;
 });
}

function uploadTIAPP() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  window.open("data:text/html;charset=utf-8," + reader.result, "", "_blank")
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

function generateRandString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 90; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function saveAppToTiles() {
  window.selector = document.createElement("input");
  selector.type = "file";
  selector.accept = ".tiapp";
  selector.setAttribute("onchange", "convertUploadedApp()");
  selector.click();
}

function convertUploadedApp() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  var key = generateRandString();
  window.dbRef.child("users").child(localStorage.name).child("apps").child(key).child(localStorage.name).set(CryptoJS.AES.encrypt(reader.result, localStorage.password) + "");
  var url = "index.html?app=8" + '&a=' + key;
  localStorage.recentUrl = url;
  localStorage.workToSaveTitle = selector.value.split(/(\\|\/)/g).pop()
  localStorage.workToSave = url;
  swal("Uploaded","Your app has been uploaded","success").then((value) => {
  window.location.href = "?app=7"
  });
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

function openApp(i) {
  var urlRef = window.dbRef.child("users").child(localStorage.name).child("apps").child(files[Object.keys(files)[i]].split("&a=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
       alertify.confirm("Opening apps download from the internet can be dangerous! Are you sure you want to continue?", function () {
         if (!navigator.userAgent.toLowerCase().includes("titanium")) {
            window.open("data:text/html;charset=utf-8," + CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8), "", "_blank")
          } else {
            window.open("installapp://" + CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8));
            swal("App Installed", "The app has been installed in TiTanium, open all your apps in the Apps menu(<span class='glyphicon glyphicon-th'></span>)", "success")
          }
         }, function() {
          return false;
       });
    });
  });
}

function openAppFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var urlRef = window.dbRef.child("users").child(localStorage.name).child("apps").child(parsed[Object.keys(parsed)[i]].split("&a=")[1]);
   urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      alertify.confirm("Opening apps download from the internet can be dangerous! Are you sure you want to continue?", function () {
        if (!navigator.userAgent.toLowerCase().includes("titanium")) {
          window.open("data:text/html;charset=utf-8," + CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8), "", "_blank")
        } else {
          window.open("installapp://" + CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8));
          swal("App Installed", "The app has been installed in TiTanium, open all your apps in the Apps menu(<span class='glyphicon glyphicon-th'></span>)", "success")
        }
      }, function () {
        return false;
      });
    });
  });
}

function appThumb(i) {
  var urlRef = window.dbRef.child("users").child(localStorage.name).child("apps").child(files[Object.keys(files)[i]].split("&a=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
     var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
     var icon = contentsrc.split("<ticon style='display: none;'>")[1].replace('</ticon>' + contentsrc.split('</ticon>')[1],"");
      if (localStorage.tileDeleteButton == "true") {
        document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openApp(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-'+ icon + '"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
      }
      if (localStorage.tileDeleteButton !== "true") {
        document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openApp(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-'+ icon + '"><br></span><br></center></h3></span></li>';
      }
    })
  });
}

function appThumbFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var urlRef = window.dbRef.child("users").child(localStorage.name).child("apps").child(parsed[Object.keys(parsed)[i]].split("&a=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      var icon = contentsrc.split("<ticon style='display: none;'>")[1].replace('</ticon>' + contentsrc.split('</ticon>')[1], "");
      if (localStorage.tileDeleteButton == "true") {
        document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openAppFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-' + icon + '"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
      }
      if (localStorage.tileDeleteButton !== "true") {
        document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openAppFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-' + icon + '"><br></span><br></center></h3></span></li>';
      }
    })
  });
}

function appThumbSearch(i) {
  var urlRef = window.dbRef.child("users").child(localStorage.name).child("apps").child(files[Object.keys(files)[i]].split("&a=")[1]);
    urlRef.on("value", function (snapshot) {
      snapshot.forEach(function (child) {
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      var icon = contentsrc.split("<ticon style='display: none;'>")[1].replace('</ticon>' + contentsrc.split('</ticon>')[1],"");
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openApp(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-'+ icon + '"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="openApp(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-'+ icon + '"><br></span><br></center></h3></span></li>';
        }
      })
    });
}
