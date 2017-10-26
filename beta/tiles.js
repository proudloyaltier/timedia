setInterval(refreshTiles, 50);

function resetTiles() {
  var resetTiles = confirm("Are you sure you want to delete all files stored in Tiles");
if (resetTiles == true) {
  localStorage.removeItem('files');
  storeInDatabase("files", "");
  window.location.reload();
} 
  else {
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
  var title = prompt("File Name");
  var upload = prompt("Enter your URL");

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
  } else {
    localStorage.files = title + "!!" + upload;
  }
  storeInDatabase("files", localStorage.files)
}



function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "";
  
   for (var i = 0; i < localStorage.files.split(",").length; i++) {
      document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li class="list-group-item card"><b>' + localStorage.files.split(",")[i].split("!!")[0] +  '</b> <span style="color: gray;">' + localStorage.files.split(",")[i].split("!!")[1] + '</span></li>';
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

