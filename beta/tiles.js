function resetTiles() {
  localStorage.files = ""
  storeInDatabase("files", localStorage.files)
  location.reload();
}

function searchFiles() {
  var search = document.getElementById("TiFilesSearch").value + '';

  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (localStorage.files.split(",")[i].split("!!")[0] == search) {
      window.open(localStorage.files.split(",")[i].split("!!")[1]);
    }
  }
}

function addFile() {
  var title = prompt("Title");
  var upload = prompt("Enter your document URL");

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
    storeInDatabase("files", localStorage.files)
  } else {
    localStorage.files = title + "!!" + upload;
  }
  storeInDatabase("files", localStorage.files)
  location.reload();
}


function refreshTiles() {
  getFromDatabase("files")
}

function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "";
  
   for (var i = 0; i < localStorage.files.split(",").length; i++) {
      document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li class="list-group-item"><b>' + localStorage.files.split(",")[i].split("!!")[0] +  '</b> <span style="color: gray;">' + localStorage.files.split(",")[i].split("!!")[1] + '</span></li>';
   }
 
  document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<datalist id="tiles-listdiv">';

  document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + "</ul>";
}

if (localStorage.files !== undefined) {
  loadTiles();
  setInterval(loadTiles, 1000);
  refreshTiles();
  setInterval(refreshTiles, 500);
}

