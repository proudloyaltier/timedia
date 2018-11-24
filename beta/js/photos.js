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
  selector.accept = "image/*,video/*,audio/*"
  selector.setAttribute("onchange", "convertPhoto()");
  selector.click();
}

function convertPhoto() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    var key = generateRandString();
    window.dbRef.child(localStorage.name).child("photos").child(key).child(localStorage.name).set(CryptoJS.AES.encrypt(reader.result, localStorage.password) + "");
    var url = "index.html?app=1" + '&i=' + key;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = selector.value.split(/(\\|\/)/g).pop()
    localStorage.workToSave = url;
    swal("Uploaded", "Your file has been uploaded", "success").then((value) => {
      window.location.href = "?app=7"
    });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function viewPhotos(i) {
  var urlRef = window.dbRef.child(localStorage.name).child("photos").child(files[Object.keys(files)[i]].split("&i=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      if (contentsrc.includes("data:image")) {
        alertify.alert('<img id="tiphotos-image" max-height="300px" width="250px" height="auto" src=' + contentsrc + '>');
      } else if (contentsrc.includes("data:video")) {
        alertify.alert('<video id="tiphotos-video" width="310" height="auto" src=' + contentsrc + ' controls></video>');
      } else if (contentsrc.includes("data:audio")) {
        alertify.alert('<audio id="tiphotos-audio" src=' + contentsrc + ' controls></audio>');
      }
    });
  });
}

function viewPhotosFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var urlRef = window.dbRef.child(localStorage.name).child("photos").child(parsed[Object.keys(parsed)[i]].split("&i=")[1]); urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      if (contentsrc.includes("data:image")) {
        alertify.alert('<img id="tiphotos-image" max-height="300px" width="250px" height="auto" src=' + contentsrc + '>');
      } else if (contentsrc.includes("data:video")) {
        alertify.alert('<video id="tiphotos-video" width="310" height="auto" src=' + contentsrc + ' controls></video>');
      } else if (contentsrc.includes("data:audio")) {
        alertify.alert('<audio id="tiphotos-audio" src=' + contentsrc + ' controls></audio>');
      }
    });
  });
}

function thumbPhotos(i) {
  var urlRef = window.dbRef.child(localStorage.name).child("photos").child(files[Object.keys(files)[i]].split("&i=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      if (contentsrc.includes("data:image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></span></li>'
        }
      } else if (contentsrc.includes("data:video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (contentsrc.includes("data:audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      }
    });
  });
}

function thumbPhotosFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var urlRef = window.dbRef.child(localStorage.name).child("photos").child(parsed[Object.keys(parsed)[i]].split("&i=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      if (contentsrc.includes("data:image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotosFolder(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(parsed)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotosFolder(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(parsed)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></span></li>'
        }
      } else if (contentsrc.includes("data:video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (contentsrc.includes("data:audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      }
    });
  });
}

function thumbPhotosSearch(i) {
  var urlRef = window.dbRef.child(localStorage.name).child("photos").child(files[Object.keys(files)[i]].split("&i=")[1]);
  urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      var contentsrc = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      if (contentsrc.includes("data:image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-searchbox').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-searchbox').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + contentsrc + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></span></li>'
        }
      } else if (contentsrc.includes("data:video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (contentsrc.includes("data:audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      }
    });
  });
}
