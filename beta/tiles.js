function resetTiles() {
  localStorage.removeItem("files");
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
  } else {
    localStorage.files = title + "!!" + upload;
  }
}

function loadTiles() {
  document.getElementById('tiles-tiles').innerHTML = "";
  
   for (var i = 0; i < localStorage.files.split(",").length; i++) {
      document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li class="list-group-item"><b>' + localStorage.files.split(",")[i].split("!!")[0] +  '</b> <span style="color: gray;">' + localStorage.files.split(",")[i].split("!!")[1] + '</span></li>';
   }
 
  document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + "</ul>";
}

loadTiles();
setInterval(loadTiles, 1000);
