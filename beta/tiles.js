localStorage.files = Array();

function searchFiles() {
  var search = document.getElementById("TiFilesSearch").value + '';

  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (localStorage.files.split(",")[i].split(":")[0] == search) {
      window.location.href = localStorage.files.split(",")[i].split(":")[1];
    }
  }
}

function addFile() {
  var title = prompt("Title");
  var upload = prompt("Enter your document URL");

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + ":" + upload;
  } else {
    localStorage.files = title + ":" + upload;
  }
}
