
function saveImage() {
  var url = "index.html?app=11"+ '&i=' + localStorage.imageUploaded"
  localStorage.recentUrl = url;
  localStorage.workToSave = url;
  window.location.href = "?app=7";
}
  
  
  if (getQueryVariable('i') !== undefined) {
  document.getElementById('tiphotos').remove();
  document.getElementById('tiphotos-view').style = "visibility: block;";
  setInterval(viewImageData, 0);
  }

saveImageTile() {
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  
  reader.addEventListener("load", function () {
    localStorage.imageUploaded = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}


function viewImageData() {
  var preview = document.getElementById('tiphotos-view-img'); 
  var file    = getQueryVariable('i').files[0];
  var reader  = new FileReader();
  
  reader.addEventListener("load", function () {
    localStorage.imageUploaded = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
 }

}
