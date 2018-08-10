var files = {};

var tiles_filters = {
  "docs": false,
  "sheets": false,
  "slides": false,
  "photos": false,
  "bookmarks": false,
  "apps": false
}

if (files == null) {
  files = "";
  localStorage.removeItem(files);
  save()
  refreshTiles();
}

function getFromDatabaseTiles(name) {
  window.gfdName = name;
  window.dbRef.child(name).child(localStorage.name).on("value", snapValueTiles, errorLoadingTiles);
}

function snapValueTiles(value) {
  files = value.val();
  localStorage.files = JSON.stringify(files);
  window.gfdName = null;
}

function errorLoadingTiles(err) {
  alert(err);
}

function refreshTiles() {
  getFromDatabaseTiles("files");
}

refreshTiles();

function addFilter(filter) {
  tiles_filters[filter] = true;
  clearInterval(tilesLoadInterval)
  loadTilesFilters();
}


function removeFilter(filter) {
  tiles_filters[filter] = false;
  if (tiles_filters["docs"] == false && tiles_filters["sheets"] == false && tiles_filters["slides"] == false && tiles_filters["photos"] == false && tiles_filters["bookmarks"] == false) {
    var tilesLoadInterval = setInterval(loadTiles, 1000);
  }
}

function checkFilterStates() {
  if (document.getElementById('docs-filter').checked == true) {
    addFilter("docs")
  } else if (tiles_filters["docs"] !== false && document.getElementById('docs-filter').checked == false) {
    removeFilter("docs")
  }
  if (document.getElementById('sheets-filter').checked == true) {
    addFilter("sheets")
  } else if (tiles_filters["sheets"] !== false && document.getElementById('sheets-filter').checked == false) {
    removeFilter("sheets")
  }
  if (document.getElementById('slides-filter').checked == true) {
    addFilter("slides")
  } else if (tiles_filters["slides"] !== false && document.getElementById('slides-filter').checked == false) {
    removeFilter("slides")
  }
  if (document.getElementById('bookmarks-filter').checked == true) {
    addFilter("bookmarks")
  } else if (tiles_filters["bookmarks"] !== false && document.getElementById('bookmarks-filter').checked == false) {
    removeFilter("bookmarks")
  }
  if (document.getElementById('photos-filter').checked == true) {
    addFilter("photos")
  } else if (tiles_filters["photos"] !== false && document.getElementById('photos-filter').checked == false) {
    removeFilter("photos")
  }
  if (document.getElementById('apps-filter').checked == true) {
    addFilter("apps")
  } else if (tiles_filters["apps"] !== false && document.getElementById('apps-filter').checked == false) {
    removeFilter("apps")
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


document.getElementById("ti-work").onclick = function () {
  if (this.style.transform == "") {
    this.style.transform = "rotate(45deg)";
    this.style.backgroundColor = "#c19a95";
    this.style.color = "#ffffff";
    document.getElementById('tiapps-icon').style.bottom = '430px';
    document.getElementById('docs-icon').style.bottom = '370px';
    document.getElementById('slides-icon').style.bottom = '310px';
    document.getElementById('sheets-icon').style.bottom = '250px';
    document.getElementById('bookmarks-icon').style.bottom = '190px';
    document.getElementById('upload-icon').style.bottom = '130px';
    document.getElementById('folder-icon').style.bottom = '70px';
    document.getElementById('tiapps-icon').style.backgroundColor = "#7200ff";
    document.getElementById('docs-icon').style.backgroundColor = '#2296F3';
    document.getElementById('slides-icon').style.backgroundColor = '#f4b400';
    document.getElementById('sheets-icon').style.backgroundColor = '#008c1e';
    document.getElementById('bookmarks-icon').style.backgroundColor = '#ff0000';
    document.getElementById('upload-icon').style.backgroundColor = '#346df9';
    document.getElementById('folder-icon').style.backgroundColor = '#f4b400';
  } else {
    this.style.transform = "";
    this.style.backgroundColor = "lightgray";
    this.style.color = "gray";
    for (var i = 0; i < document.getElementsByClassName("ti-work-icon").length; i++) {
      document.getElementsByClassName("ti-work-icon")[i].style.bottom = "10px";
      document.getElementsByClassName("ti-work-icon")[i].style.backgroundColor = "lightgray";
    }
  }
}

var overTile = false;

function save() {
  window.dbRef.child("files").child(localStorage.name).set(files);
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

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function moveTileIntoFolder(tileid) {
  alertify
    .defaultValue("")
    .prompt("Which Folder (case sensitive)", function (val) {
      val = encodeURI(val);
      if (typeof files[val] == "undefined") {
        swal("Error", "Please enter a valid folder name", "error")
      } else {
        var parsed = JSON.parse(files[val]);
        parsed[Object.keys(files)[tileid]] = files[Object.keys(files)[tileid]];
        delete files[Object.keys(files)[tileid]]
        files[val] = JSON.stringify(parsed);
        save();
        swal("Successful", "Your file has been moved!", "success")
      }
    })
}

function moveTileOutOfFolder(tileid) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  files[Object.keys(parsed)[tileid]] = parsed[Object.keys(parsed)[tileid]]
  delete parsed[Object.keys(parsed)[tileid]]
  if (JSON.stringify(parsed) == "{}") {
    parsed = null;
    files[getQueryVariable("f")] = null
  } else {
    files[getQueryVariable("f")] = JSON.stringify(parsed);
  }
  save();
  swal("Successful", "Your file has been moved!", "success")
}

function deleteTileFolder(tileid) {
  var parsed = JSON.parse(files[getQueryVariable("f")]);
  alertify.confirm("Are you sure you want to delete this Tile?", function () {
    var fbFolder;
    if (parsed[Object.keys(parsed)[tileid]].includes("index.html?app=3&p=")) {
      fbFolder = "docs";
    } else if (parsed[Object.keys(parsed)[tileid]].includes("index.html?app=4&t=")) {
      fbFolder = "sheets";
    } else if (parsed[Object.keys(parsed)[tileid]].includes("index.html?app=9&s=")) {
      fbFolder = "slides";
    } else if (parsed[Object.keys(parsed)[tileid]].includes("index.html?app=8&a=")) {
      fbFolder = "apps"
    } else {
      fbFolder = "photos"
    }
    var toDelFirebase = parsed[Object.keys(parsed)[tileid]].slice(19);
    window.dbRef.child(fbFolder).child(toDelFirebase).set(null);
    delete parsed[Object.keys(parsed)[tileid]]
    if (JSON.stringify(parsed) == "{}") {
      if (Object.keys(files).length <= 1) {
        files = ""
        save();
        return false;
      } else {
        files[getQueryVariable("f")] = null;
      }
    } else {
      files[getQueryVariable("f")] = JSON.stringify(parsed);
    }
    save();
    swal("Deleted!", "Tile successfully deleted!", "success").then((value) => {
      window.location.reload();
    })
  }, function () {
    window.location.reload();
  });
}

function newFolder() {
  if (typeof files !== "object" || files == null) {
    files = {};
  }
  alertify
    .defaultValue("Untitled Folder")
    .prompt("Create a new folder",
      function (val) {
        if (files[encodeURI(val)] == undefined) {
          files[encodeURI(val)] = JSON.stringify({});
          window.dbRef.child("files").child(localStorage.name).set(files);
          swal("Created", "Your new folder has been created!", "success");
        } else {
          swal("Error", "The folder name is already in use!", "error")
        }
      })
}

function renameTilePromptFolder(tid) {
  var parsed = JSON.parse(files[getQueryVariable("f")])
  alertify
    .defaultValue(Object.keys(parsed)[tid])
    .prompt("Rename",
      function (val) {
        if (val != null) {
          parsed[val] = parsed[Object.keys(parsed)[tid]]
          delete parsed[Object.keys(parsed)[tid]];
          files[getQueryVariable("f")] = JSON.stringify(parsed);
          save();
        }
      });
}

if (getQueryVariable("f") !== false) {
  files = JSON.parse(localStorage.files)
  loadTilesFolders();
}

function renameTile(tid, rwith) {
  files[rwith] = files[Object.keys(files)[tid]]
  delete files[Object.keys(files)[tid]]
  save();
}

function renameTilePrompt(tid) {
  alertify
    .defaultValue(Object.keys(files)[tid])
    .prompt("Rename",
      function (val) {
        if (val != null) {
          renameTile(tid, val);
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
  alertify.confirm("Are you sure you want to delete this Tile?", function () {
    var fbFolder;
    if (files[Object.keys(files)[tileid]].includes("index.html?app=3&p=")) {
      fbFolder = "docs";
    } else if (files[Object.keys(files)[tileid]].includes("index.html?app=4&t=")) {
      fbFolder = "sheets";
    } else if (files[Object.keys(files)[tileid]].includes("index.html?app=9&s=")) {
      fbFolder = "slides";
    } else if (files[Object.keys(files)[tileid]].includes("index.html?app=8&a=")) {
      fbFolder = "apps"
    } else {
      fbFolder = "photos"
    }
    var toDelFirebase = files[Object.keys(files)[tileid]].slice(19);
    window.dbRef.child(fbFolder).child(toDelFirebase).set(null);
    if (Object.keys(files).length <= 1) {
      files = "";
      storeInDatabase("files", "");
    }
    delete files[Object.keys(files)[tileid]]
    save();
    swal("Deleted!", "Tile successfully deleted!", "success").then((value) => {
      window.location.reload();
    })
  }, function () {
    window.location.reload();
  });
}

function openTileContext(tileID) {
  document.getElementById("context-menu").innerHTML = '<ul class="context-menu__items"><li><a href="#" onclick="deleteTile(' + tileID + ')"><span class="glyphicon glyphicon-trash"></span> Delete</a></li><li><a href="#" onclick="renameTilePrompt(' + tileID + ')"><span class="glyphicon glyphicon-pencil"></span> Rename</a></li><li><a href="#" onclick="moveTileIntoFolder(' + tileID + ')"><span class="glyphicon glyphicon-share"></span> Move </a></li></ul>';
}

function openTileContextFolder(tileID) {
  document.getElementById("context-menu").innerHTML = '<ul class="context-menu__items"><li><a href="#" onclick="deleteTileFolder(' + tileID + ')"><span class="glyphicon glyphicon-trash"></span> Delete</a></li><li><a href="#" onclick="renameTilePromptFolder(' + tileID + ')"><span class="glyphicon glyphicon-pencil"></span> Rename</a></li><li><a href="#" onclick="moveTileOutOfFolder(' + tileID + ')"><span class="glyphicon glyphicon-share"></span> Move Back To All Files</a></li></ul>';
}

function resetTiles() {
  alertify.confirm("Are You Sure You Want To Delete All of Your Tiles?", function () {
    for (var i = 0; i < Object.keys(files).length; i++) {
      var fbFolder;
      if (files[Object.keys(files)[i]].includes("index.html?app=3&p=")) {
        fbFolder = "docs";
      } else if (files[Object.keys(files)[i]].includes("index.html?app=4&t=")) {
        fbFolder = "sheets";
      } else if (files[Object.keys(files)[i]].includes("index.html?app=9&s=")) {
        fbFolder = "slides";
      } else if (files[Object.keys(files)[i]].includes("index.html?app=8&a=")) {
        fbFolder = "apps"
      } else {
        fbFolder = "photos"
      }
      var toDelFirebaseReset = files[Object.keys(files)[i]].slice(19);
      window.dbRef.child(fbFolder).child(toDelFirebaseReset).set(null);
    }
    files = "";
    storeInDatabase("files", "");
    swal("Reset!", "Tiles successfully reset!", "success").then((value) => {
      window.location.href = "index.html?app=7";
    })
  }, function () {
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

    for (var i = 0; i < Object.keys(files).length; i++) {
      if (Object.keys(files)[i].toLowerCase().includes(search.toLowerCase())) {
        if (files[Object.keys(files)[i]].includes('?app=3') && !IsJsonString(files[Object.keys(files)[i]])) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById('tiles-searchbox').innerHTML = document.getElementById('tiles-searchbox').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById('tiles-searchbox').innerHTML = document.getElementById('tiles-searchbox').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
          }
        }

        if (files[Object.keys(files)[i]].includes("?app=4") && !IsJsonString(files[Object.keys(files)[i]])) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
          }
        }

        if (files[Object.keys(files)[i]].includes("?app=10") && !IsJsonString(files[Object.keys(files)[i]])) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById('tiles-searchbox').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
          }
        }
        if (files[Object.keys(files)[i]].includes("?app=1") && files[Object.keys(files)[i]].includes("?app=10") !== true && !IsJsonString(files[Object.keys(files)[i]])) {
          thumbPhotosSearch(i)
        }
        if (files[Object.keys(files)[i]].includes("?app=8") && !IsJsonString(files[Object.keys(files)[i]])) {
          appThumbSearch(i)
        }
        if (IsJsonString(files[Object.keys(files)[i]])) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById('tiles-searchbox').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + 'index.html?app=7&f=' + Object.keys(files)[i] + '\');"><h3><center>' + decodeURI(Object.keys(files)[i]) + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-folder-open"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + 'index.html?app=7&f=' + Object.keys(files)[i] + '\');"><h3><center>' + decodeURI(Object.keys(files)[i]) + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-folder-open"><br></span><br></center></h3></span></li>';
          }
        }
        if (files[Object.keys(files)[i]].includes("?app=9")) {
          if (localStorage.tileDeleteButton == "true") {
            document.getElementById('tiles-searchbox').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
          }
          if (localStorage.tileDeleteButton !== "true") {
            document.getElementById("tiles-searchbox").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
          }
        }
      }
    }
  }
}

function addFile(title, upload) {
  if (title == undefined && upload == undefined) {
    var title = prompt("File Name");
    var upload = prompt("Enter your URL");
  }
  files = JSON.parse(localStorage.files);
  if (files == "") {
    files = {};
  }
  title = title.replace(".", " ");
  files[title] = upload
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

  if (files !== "" && files !== {}) {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < Object.keys(files).length; i++) {
      if (files[Object.keys(files)[i]].includes('?app=3') && tiles_filters.docs == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
        }
      }

      if (files[Object.keys(files)[i]].includes("?app=4") && tiles_filters.sheets == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
        }
      }

      if (files[Object.keys(files)[i]].includes("?app=10") && tiles_filters.bookmarks == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
        }
      }
      if (files[Object.keys(files)[i]].includes("?app=1") && files[Object.keys(files)[i]].includes("?app=10") !== true && tiles_filters.photos == true) {
        thumbPhotos(i)
      }
      if (files[Object.keys(files)[i]].includes("?app=8") && tiles_filters.apps == true) {
        appThumb(i)
      }
      if (files[Object.keys(files)[i]].includes("?app=9") && tiles_filters.slides == true) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
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

  if (files !== "" && files !== {}) {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < Object.keys(files).length; i++) {
      if (files[Object.keys(files)[i]].includes('?app=3') && !IsJsonString(files[Object.keys(files)[i]])) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
        }
      }

      if (files[Object.keys(files)[i]].includes("?app=4") && !IsJsonString(files[Object.keys(files)[i]])) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
        }
      }

      if (files[Object.keys(files)[i]].includes("?app=10") && !IsJsonString(files[Object.keys(files)[i]])) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
        }
      }
      if (files[Object.keys(files)[i]].includes("?app=1") && files[Object.keys(files)[i]].includes("?app=10") !== true && !IsJsonString(files[Object.keys(files)[i]])) {
        thumbPhotos(i)
      }
      if (files[Object.keys(files)[i]].includes("?app=8") && !IsJsonString(files[Object.keys(files)[i]])) {
        appThumb(i)
      }
      if (IsJsonString(files[Object.keys(files)[i]])) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + 'index.html?app=7&f=' + Object.keys(files)[i] + '\');"><h3><center>' + decodeURI(Object.keys(files)[i]) + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-folder-open"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + 'index.html?app=7&f=' + Object.keys(files)[i] + '\');"><h3><center>' + decodeURI(Object.keys(files)[i]) + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-folder-open"><br></span><br></center></h3></span></li>';
        }
      }
      if (files[Object.keys(files)[i]].includes("?app=9") && !IsJsonString(files[Object.keys(files)[i]])) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContext(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + files[Object.keys(files)[i]] + '\');"><h3><center>' + Object.keys(files)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
        }
      }
    }

    document.getElementById("tiles-tiles").innerHTML += "<datalist id='tiles-listdiv'>";
    document.getElementById("tiles-tiles").innerHTML += "</ul>";
  } else {
    document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
  }
}

function loadTilesFolders() {
  document.getElementById('tiles-tiles').innerHTML = "Loading . . .";

  if (files !== "" && files !== {}) {
    document.getElementById('tiles-tiles').innerHTML = "";
    var parsed = JSON.parse(files[getQueryVariable("f")])
    for (var i = 0; i < Object.keys(parsed).length; i++) {
      if (parsed[Object.keys(parsed)[i]].includes('?app=3')) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-pencil"><br></span><br></center></h3></span></li>';
        }
      }

      if (parsed[Object.keys(parsed)[i]].includes("?app=4")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #008c1e;" class="glyphicon glyphicon-th-list"><br></span><br></center></h3></span></li>';
        }
      }

      if (parsed[Object.keys(parsed)[i]].includes("?app=10")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #ff0000;" class="glyphicon glyphicon-bookmark"><br></span><br></center></h3></span></li>';
        }
      }
      if (parsed[Object.keys(parsed)[i]].includes("?app=1") && !parsed[Object.keys(parsed)[i]].includes("?app=10")) {
        thumbPhotosFolder(i)
      }
      if (parsed[Object.keys(parsed)[i]].includes("?app=8")) {
        appThumbFolder(i)
      }
      if (parsed[Object.keys(parsed)[i]].includes("?app=9")) {
        if (localStorage.tileDeleteButton == "true") {
          document.getElementById('tiles-tiles').innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTileFolder(' + i + ');">Delete</button></center></h3></span></li>';
        }
        if (localStorage.tileDeleteButton !== "true") {
          document.getElementById("tiles-tiles").innerHTML += '<li onmouseover="overTile = true" onmouseout="overTile = false" oncontextmenu="openTileContextFolder(' + i + ')" style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + parsed[Object.keys(parsed)[i]] + '\');"><h3><center>' + Object.keys(parsed)[i] + '<br><span style="font-size: 300%; color: #f4b400;" class="glyphicon glyphicon-blackboard"><br></span><br></center></h3></span></li>';
        }
      }
    }

    document.getElementById("tiles-tiles").innerHTML += "<datalist id='tiles-listdiv'>";
    document.getElementById("tiles-tiles").innerHTML += "</ul>";
  } else {
    document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
  }
}

function redirect() {
  window.location.href = localStorage.recentUrl;
}


if (getQueryVariable('app') == 7 && getQueryVariable("f") == false) {
  refreshTiles();
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
