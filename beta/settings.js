function resetTiles() {
  var resetTiles = confirm("Are you sure you want to delete all files stored in Tiles")
if (r == true) {
  localStorage.removeItem('files');
  storeInDatabase("files", localStorage.files);
} 
  else {
    window.location.reload();
  }
}

function updateSettings() {
  localStorage.bgImg = document.getElementById('backgroundImg').value;
  localStorage.barColor = document.getElementById('barColor').value;
  location.reload();
}

if (localStorage.bgImg !== undefined) {
  document.getElementById('body').background = localStorage.bgImg;
}

if (localStorage.barColor !== undefined) {
  document.getElementById('navbar').style = "background-color: #" + localStorage.barColor + ";";
}
