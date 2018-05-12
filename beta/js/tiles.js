document.getElementById("ti-work").onclick = function() {
  this.style.width = '50px';
  this.style.height = '50px';
  this.style.top = 'calc(100% - 50px)';
  this.style.left = 'calc(100% - 50px)';
  document.getElementById('fab-text').style.fontSize = "30px";
  setTimeout(function() {
    document.getElementById("ti-work").style.display = "none";
    document.getElementById('docs-icon').style.top = '80%';
    document.getElementById('docs-icon').style.left = 'calc(90% - 70px)';
    document.getElementById('sheets-icon').style.top = '80%';
    document.getElementById('sheets-icon').style.left = '90%';
    document.getElementById('bookmarks-icon').style.top = '90%';
    document.getElementById('bookmarks-icon').style.left = 'calc(90% - 70px)';
    document.getElementById('slides-icon').style.left = '90%';
    document.getElementById('slides-icon').style.top = '90%';
    setTimeout(function() {
      document.getElementById('docs-icon').style.backgroundColor = '#2296F3';
      document.getElementById('slides-icon').style.backgroundColor = '#f4b400';
      document.getElementById('sheets-icon').style.backgroundColor = '#008c1e';
      document.getElementById('bookmarks-icon').style.backgroundColor = '#ff0000';
    }, 250);
  }, 750);
}

var overTile = false;

function save() {
  storeInDatabase("files", localStorage.files);
}

function showTiWorkColor() {
  document.getElementById("fontColorDiv").style.display = "";
}

function showTiWorkColorSheets() {
  document.getElementById("fontColorDivSheets").style.display = "";
}

function setColor() {
  var color = "#" + document.getElementById("fontColor").value;
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, color);
  document.getElementById("fontColorDiv").style.display = "none";
  saveDoc();
}

function setColorSheets() {
  var color = "#" + document.getElementById('fontColorSheets').value;
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, color);
  document.getElementById("fontColorDivSheets").style.display = "none";
  saveSheet();
}

/*

function insertImage() {
alertify
  .defaultValue('https://')
  .prompt("Image URL",
          function (val) {
          document.execCommand('insertImage',false,val);
   });
}

*/

if (localStorage.files == "null") {
  localStorage.files = "";
  save();
}

function renameTile(tid, rwith) {
  localStorage.files = localStorage.files.replace(localStorage.files.split(",")[tid], rwith + "!!" + localStorage.files.split(",")[tid].split("!!")[1]);
  save();
}

function renameTilePrompt(tid) {
  alertify
    .defaultValue(localStorage.files.split(",")[tid].split("!!")[0])
    .prompt("Rename",
      function(val) {
        var replacename = val + "!!" + localStorage.files.split(",")[tid].split("!!")[1]
        if (replacename != null) {
          localStorage.files = localStorage.files.replace(localStorage.files.split(",")[tid], replacename);
          save();
        }
      });
}

function generateRandString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 90; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function deleteTile(tileid) {
  alertify.confirm("Are you sure you want to delete this Tile?", function() {
    var toDelFirebase = localStorage.files.split(",")[tileid].split("!!")[1].slice(19);
    window.dbRef.child(toDelFirebase).set(null);
   if (localStorage.files.split(",").length > 1) {
    localStorage.files = localStorage.files.replace("," + localStorage.files.split(",")[tileid].split("!!")[0] + "!!" + localStorage.files.split(",")[tileid].split("!!")[1], "");
   } else {
    localStorage.files = ""
    storeInDatabase("files",null)
   }
    save();
    swal("Deleted!", "Tile successfully deleted!", "success").then((value) => {
      window.location.reload();
    })
  }, function() {
    window.location.reload();
  });
}

function openTileContext(tileID) {
  document.getElementById("context-menu").innerHTML = '<ul class="context-menu__items"><li><a href="#" onclick="deleteTile(' + tileID + ')"><span class="glyphicon glyphicon-trash"></span> Delete</a></li><li><a href="#" onclick="renameTilePrompt(' + tileID + ')"><span class="glyphicon glyphicon-pencil"></span> Rename</a></li></ul>';
}

function resetTiles() {
  alertify.confirm("Are You Sure You Want To Delete All of Your Tiles?", function() {
    localStorage.files = ""
    storeInDatabase("files", "");
    swal("Reset!", "Tiles successfully reset!", "success").then((value) => {
      window.location.href = "index.html?app=7";
    })
  }, function() {
    window.location.reload();
  })
}

function searchTiles(search) {
  document.getElementById("tiles-searchbox").innerHTML = "";

  if (search == "") {
    document.getElementById("tiles-tiles").style.display = "";
    document.getElementById("tiles-searchbox").style.display = "none";
    loadTiles();
  } else {
    document.getElementById("tiles-tiles").style.display = "none";
    document.getElementById("tiles-searchbox").style.display = "";

    for (var i = 0; i < localStorage.files.split(",").length; i++) {
      if (localStorage.files.split(",")[i].toLowerCase().includes(search.toLowerCase())) {
        if (localStorage.files.split(",")[i].split("!!")[1].includes('?app=3')) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
          }
        }

        if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=4")) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
          }
        }

        if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=10")) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
          }
        }
         if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1")) {
           if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-picture"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-picture"><br></span><br></center></h3></span></li>';
          }
        }
        if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=9")) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById('tiles-searchbox').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
          }
        }
      }
    }
  }
}

function backupTiles(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

function restoreTiles() {
  var toRestore = prompt("Copy and paste the text from your backup");
  localStorage.files = toRestore;
  storeInDatabase("files", localStorage.files);
  window.location.href = "index.html?app=7"
}

function addFile(title, upload) {
  if (title == undefined && upload == undefined) {
    var title = prompt("File Name");
    var upload = prompt("Enter your URL");
  }

  if (localStorage.files !== undefined && localStorage.files !== "") {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
  } else {
    localStorage.files = title + "!!" + upload;
  }

  if (localStorage.files === "") {
    localStorage.files = title + "!!" + upload;
  }

  save();
}

function saveFromTiWork() {
  var title = localStorage.workToSaveTitle;
  var tosave = localStorage.workToSave;
  localStorage.removeItem('workToSave');
  localStorage.removeItem('workToSaveTitle');
  addFile(title, tosave);
}

function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";

  if (localStorage.files !== "") {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
      if (localStorage.files.split(",")[i].split("!!")[1].includes('?app=3')) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
        }
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=4")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
        }
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=10")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
        }
      }
      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-picture"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f754f9;" class="glyphicon glyphicon-picture"><br></span><br></center></h3></span></li>';
        }
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=9")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
        }
      }
    }

    document.getElementById("tiles-tiles").innerHTML += "<datalist id='tiles-listdiv'>";
    document.getElementById("tiles-tiles").innerHTML += "</ul>";
  }
}

function refreshTiles() {
  getFromDatabase("files");
}

function redirect() {
  window.location.href = localStorage.recentUrl;
}


if (localStorage.files !== undefined && getQueryVariable('app') == 7) {
  loadTiles();
  setInterval(loadTiles, 1000);
}

if (localStorage.workToSave !== undefined) {
  saveFromTiWork();
}

if (getQueryVariable("bookmarkurl") !== false) {
  addFile(atob(getQueryVariable("bookmarktitle")), atob(getQueryVariable("bookmarkurl")));
  save();
  window.location.href = atob(getQueryVariable("bookmarkurl"));
}

refreshTiles();
