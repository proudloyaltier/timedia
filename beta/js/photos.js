function generateRandString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 90; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

window.storageRef = firebase.storage().ref();

function uploadPhoto() {
  window.selector = document.createElement("input");
  selector.type = "file";
  selector.setAttribute("onchange", "convertPhoto()");
  selector.click();
}

function convertPhotoFromDrag(file, name) {
  window.storageRef.child(localStorage.name).child(name).put(file).then(function () {
    var url = "index.html?app=1" + '&i=' + name;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = name.split(/(\\|\/)/g).pop()
    localStorage.workToSave = url;
    saveFromTiWork()
    swal("Uploaded", "Your file has been uploaded", "success").then((value) => {
      window.location.href = "?app=7"
    });
  })
}

function convertPhoto() {
  var file = selector.files[0];
  window.storageRef.child(localStorage.name).child(selector.files[0].name).put(file).then(function () {
    var url = "index.html?app=1" + '&i=' + selector.files[0].name;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = selector.value.split(/(\\|\/)/g).pop()
    localStorage.workToSave = url;
    swal("Uploaded", "Your file has been uploaded", "success").then((value) => {
      window.location.href = "?app=7"
    });
  })
}

function viewPhotos(i) {
  var ref = storageRef.child(localStorage.name).child(files[Object.keys(files)[i]].split("&i=")[1])
  storageRef.child(localStorage.name).child(files[Object.keys(files)[i]].split("&i=")[1]).getDownloadURL().then(function (url) {
    storageRef.child(localStorage.name).child(files[Object.keys(files)[i]].split("&i=")[1]).getMetadata().then(function (metadata) {
      if (metadata.contentType.startsWith("image")) {
        alertify.alert('<img id="tiphotos-image" max-height="300px" width="250px" height="auto" src=' + url + '>');
      } else if (metadata.contentType.startsWith("video")) {
        alertify.alert('<video id="tiphotos-video" width="310" height="auto" src=' + url + ' controls></video>');
      } else if (metadata.contentType.startsWith("audio")) {
        alertify.alert('<audio id="tiphotos-audio" src=' + url + ' controls></audio>');
      } else {
        window.open(url);
      }
    })
  })
}

function viewPhotosFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var ref = storageRef.child(localStorage.name).child(parsed[Object.keys(parsed)[i]].split("&i=")[1])
  storageRef.child(localStorage.name).child(parsed[Object.keys(parsed)[i]].split("&i=")[1]).getDownloadURL().then(function (url) {
    storageRef.child(localStorage.name).child(parsed[Object.keys(parsed)[i]].split("&i=")[1]).getMetadata().then(function (metadata) {
      if (metadata.contentType.startsWith("image")) {
        alertify.alert('<img id="tiphotos-image" max-height="300px" width="250px" height="auto" src=' + url + '>');
      } else if (metadata.contentType.startsWith("video")) {
        alertify.alert('<video id="tiphotos-video" width="310" height="auto" src=' + url + ' controls></video>');
      } else if (metadata.contentType.startsWith("audio")) {
        alertify.alert('<audio id="tiphotos-audio" src=' + url + ' controls></audio>');
      } else {
        window.open(url);
      }
    })
  })
}

function thumbPhotos(i) {
  var ref = storageRef.child(localStorage.name).child(files[Object.keys(files)[i]].split("&i=")[1])
  ref.getDownloadURL().then(function (url) {
    ref.getMetadata().then(function (metadata) {
      if (metadata.contentType.startsWith("image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></span></li>'
        }

      } else if (metadata.contentType.startsWith("video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (metadata.contentType.startsWith("audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      } else {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br></center></h3></span></li>';
        }
      }
    })
  })
}


function thumbPhotosFolder(i) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  var ref = storageRef.child(localStorage.name).child(parsed[Object.keys(parsed)[i]].split("&i=")[1])
  ref.getDownloadURL().then(function (url) {
    ref.getMetadata().then(function (metadata) {
      if (metadata.contentType.startsWith("image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotosFolder(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(parsed)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onclick="viewPhotosFolder(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(parsed)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></span></li>'
        }
      } else if (metadata.contentType.startsWith("video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (metadata.contentType.startsWith("audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      } else {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotosFolder(' + i + ')"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br></center></h3></span></li>';
        }
      }
    })
  })
}

function thumbPhotosSearch(i) {
  var ref = storageRef.child(localStorage.name).child(files[Object.keys(files)[i]].split("&i=")[1])
  ref.getDownloadURL().then(function (url) {
    ref.getMetadata().then(function (metadata) {
      if (metadata.contentType.startsWith("image")) {
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-searchbox').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3></span></li>'
        }
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-searchbox').innerHTML += '<li onclick="viewPhotos(' + i + ')" onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="img-background"><center><img height="200px" width="auto" src=' + url + '></center><span class="img-background-bottom-bar"><h3 style="color: gray; vertical-align: middle; display: table-cell;"><span class="glyphicon glyphicon-picture" style="font-size: 30px; padding: 10px;"></span>' + Object.keys(files)[i] + '</h3> <center><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></span></li>'
        }
      } else if (metadata.contentType.startsWith("video")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-facetime-video"><br></span><br></center></h3></span></li>';
        }
      } else if (metadata.contentType.startsWith("audio")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-headphones"><br></span><br></center></h3></span></li>';
        }
      } else {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="viewPhotos(' + i + ')"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-file"><br></span><br></center></h3></span></li>';
        }
      }
    })
  })
}
