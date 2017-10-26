function resetTiles() {
  var resetTiles = confirm("Are you sure you want to delete all files stored in Tiles?");
  if (resetTiles == true) {
    localStorage.removeItem('files');
    storeInDatabase("files", "");
    window.location.reload();
  }
}

function save() {
  storeInDatabase("files", localStorage.files)
  alert("All changes saved in Tiles.")
}

function searchFiles() {
  var search = document.getElementById("TiFilesSearch").value + '';

  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (localStorage.files.split(",")[i].split("!!")[0] == search) {
      window.open(localStorage.files.split(",")[i].split("!!")[1]);
    }
  }
}

function addFile(title, upload) {
  if (title == undefined && upload == undefined) {
    var title = prompt("File Name");
    var upload = prompt("Enter your URL");
  }

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
  } else {
    localStorage.files = title + "!!" + upload;
  }
  storeInDatabase("files", localStorage.files);
  location.reload();
}

function saveFromTiWork() {
  var title = prompt("File Name");
  var tosave = localStorage.workToSave;
  localStorage.removeItem('workToSave');
  addFile(title, tosave);
}


function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "";

  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #32F39C;" class="glyphicon glyphicon-th-large"></span></center></h3></span></li>';
  }

  document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<datalist id="tiles-listdiv">';

  document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + "</ul>";
}

function refreshTiles() {
  getFromDatabase("files")
}

function store() {
  storeInDatabase("files", localStorage.files)
}

function redirect() {
  window.location.href = localStorage.recentUrl;
}


if (localStorage.files !== undefined) {
  loadTiles();
  setInterval(loadTiles, 1000);
}

if (localStorage.workToSave !== undefined) {
  saveFromTiWork();
}

setInterval(refreshTiles, 10000)
