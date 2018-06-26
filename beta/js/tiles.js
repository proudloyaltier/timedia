var tiles_filters = {
  "docs": false,
  "sheets": false,
  "slides": false,
  "photos": false,
  "bookmarks": false
}
  
function addFilter(filter) {
    tiles_filters[filter] = true;
    clearInterval(tilesLoadInterval)
    loadTilesFilters();
}


function removeFilter(filter) {
    tiles_filters[filter] = false;
    if (tiles_filters["docs"] == false && tiles_filters["sheets"] == false &&  tiles_filters["slides"] == false &&  tiles_filters["photos"] == false &&  tiles_filters["bookmarks"] == false) {
      var tilesLoadInterval = setInterval(loadTiles, 1000);
    }
}

function checkFilterStates() {
   if (document.getElementById('docs-filter').checked == true) {
   addFilter("docs")
   } else if (tiles_filters["docs"] !== false && document.getElementById('docs-filter').checked == false){
   removeFilter("docs")
   }
  if (document.getElementById('sheets-filter').checked == true) {
   addFilter("sheets")
   } else if (tiles_filters["sheets"] !== false && document.getElementById('sheets-filter').checked == false){
   removeFilter("sheets")
   }
  if (document.getElementById('slides-filter').checked == true) {
   addFilter("slides")
   } else if (tiles_filters["slides"] !== false && document.getElementById('slides-filter').checked == false){
   removeFilter("slides")
   }
  if (document.getElementById('bookmarks-filter').checked == true) {
   addFilter("bookmarks")
   } else if (tiles_filters["bookmarks"] !== false && document.getElementById('bookmarks-filter').checked == false){
   removeFilter("bookmarks")
   }
   if (document.getElementById('photos-filter').checked == true) {
   addFilter("photos")
   } else if (tiles_filters["photos"] !== false && document.getElementById('photos-filter').checked == false){
   removeFilter("photos")
   }
}

setInterval(checkFilterStates, 0);

function showFilterSelect() {
  document.getElementById('select-filters').style.display = 'block'
  document.getElementById('filter-btn').onclick = hideFilterSelect
  document.getElementById('filter-btn').className = 'glyphicon glyphicon-menu-up';
}

function hideFilterSelect() {
  document.getElementById('select-filters').style.display = 'none'
  document.getElementById('filter-btn').onclick = showFilterSelect
  document.getElementById('filter-btn').className = 'glyphicon glyphicon-menu-down';
}


document.getElementById("ti-work").onclick = function() {
  if (this.style.transform == "") {
    this.style.transform = "rotate(45deg)";
    this.style.backgroundColor = "#c19a95";
    this.style.color = "#ffffff";
    document.getElementById('docs-icon').style.bottom = '310px';
  document.getElementById('slides-icon').style.bottom = '250px';
  document.getElementById('sheets-icon').style.bottom = '190px';
  document.getElementById('bookmarks-icon').style.bottom = '130px';
  document.getElementById('upload-icon').style.bottom = '70px';
  document.getElementById('docs-icon').style.backgroundColor = '#2296F3';
  document.getElementById('slides-icon').style.backgroundColor = '#f4b400';
  document.getElementById('sheets-icon').style.backgroundColor = '#008c1e';
  document.getElementById('bookmarks-icon').style.backgroundColor = '#ff0000';
  document.getElementById('upload-icon').style.backgroundColor = '#346df9';
  } else {
    this.style.transform = "";
    this.style.backgroundColor = "lightgray";
    this.style.color = "gray";
    for(var i = 0; i < document.getElementsByClassName("ti-work-icon").length; i++) {
      document.getElementsByClassName("ti-work-icon")[i].style.bottom = "10px";
      document.getElementsByClassName("ti-work-icon")[i].style.backgroundColor = "lightgray";
    }
  }
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
    var fbFolder;
    if (localStorage.files.split(",")[tileid].split("!!")[1].includes("index.html?app=3&p=")) {
      fbFolder = "docs";
    } else if (localStorage.files.split(",")[tileid].split("!!")[1].includes("index.html?app=4&t=")) {
      fbFolder = "sheets";
    } else if (localStorage.files.split(",")[tileid].split("!!")[1].includes("index.html?app=9&s=")) {
      fbFolder = "slides";
    } else {
      fbFolder = "photos"
    }
    var toDelFirebase = localStorage.files.split(",")[tileid].split("!!")[1].slice(19);
    window.dbRef.child(fbFolder).child(toDelFirebase).set(null);
   if (tileid > 0) {
    localStorage.files = localStorage.files.replace("," + localStorage.files.split(",")[tileid].split("!!")[0] + "!!" + localStorage.files.split(",")[tileid].split("!!")[1], "");
   } else {
     if (localStorage.files.split(",")[tileid + 1] !== undefined) {
     localStorage.files = localStorage.files.replace(localStorage.files.split(",")[tileid].split("!!")[0] + "!!" + localStorage.files.split(",")[tileid].split("!!")[1] + ",", "");
     } else {
     localStorage.files = localStorage.files.replace(localStorage.files.split(",")[tileid].split("!!")[0] + "!!" + localStorage.files.split(",")[tileid].split("!!")[1], "");
     }
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
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
     var fbFolder;
     if (localStorage.files.split(",")[i].split("!!")[1].includes("index.html?app=3&p=")) {
      fbFolder = "docs";
     } else if (localStorage.files.split(",")[i].split("!!")[1].includes("index.html?app=4&t=")) {
      fbFolder = "sheets";
     } else if (localStorage.files.split(",")[i].split("!!")[1].includes("index.html?app=9&s=")) {
      fbFolder = "slides";
     } else {
      fbFolder = "photos"
     }
     var toDelFirebaseReset = localStorage.files.split(",")[i].split("!!")[1].slice(19);
     window.dbRef.child(fbFolder).child(toDelFirebaseReset).set(null);
    }
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
         if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1") && localStorage.files.split(",")[i].split("!!")[1].includes("?app=10") !== true) {
          thumbPhotosSearch(i)
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

function loadTilesFilters() {
  document.getElementById('tiles-tiles').innerHTML = "Loading . . .";

  if (localStorage.files !== "") {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
      if (localStorage.files.split(",")[i].split("!!")[1].includes('?app=3') && tiles_filters.docs == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
        }
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=4") && tiles_filters.sheets == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
        }
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=10") && tiles_filters.bookmarks == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
        }
      }
      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1") && localStorage.files.split(",")[i].split("!!")[1].includes("?app=10") !== true && tiles_filters.photos == true) {
        thumbPhotos(i)
      }

      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=9") && tiles_filters.slides == true) {
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
  } else {
    document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
  }
}

function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "Loading . . .";

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
      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1") && localStorage.files.split(",")[i].split("!!")[1].includes("?app=10") !== true) {
        thumbPhotos(i)
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
  } else {
    document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
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
  var tilesLoadInterval = setInterval(loadTiles, 1000);
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
