function refreshPhotos() {
  getFromDatabase("photos");
}

function loadPhotos() {
  document.getElementById("photos").innerHTML = "";
  
  for (var i = 0; i < localStorage.photos.length) {
    document.getElementById("photos").innerHTML = document.getElementById("photos").innerHTML + '<img width="500px" src="' + localStorage.photos.split("!!&&")[i] + '">'
  }
}

if (getQueryVariable("app") == 12) {
  setInterval(refreshPhotos, 1000);
  setInterval(loadPhotos, 1000);
}
