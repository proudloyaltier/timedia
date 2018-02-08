
function saveDoc() {
if (localStorage.tidocssave == undefined) {
  var tidocsave = Math.floor(Math.random() * 1000000000);
  storeInDatabase(tidocssave, document.getElementsByTagName('h5')[0].innerHTML)
} else {
  storeInDatabase(localStorage.tidocssave, content)
  var tidocssave = localStorage.tidocssave
  localStorage.removeItem("tidocssave")
}
  var url = "index.html?app=3"+ '&p=' + tidocssave;
  localStorage.recentUrl = url;
  localStorage.workToSaveTitle = document.getElementById('docsTitle').value;
  localStorage.workToSave = url;
  window.location.href = "?app=7";
}

if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    document.getElementsByTagName('h5')[0].innerHTML = decodeURI(localStorage.edit);
    localStorage.removeItem('edit');
    throw new Error("Opened edit.");
  }
  
  document.getElementById('create').remove();
  document.getElementById('view').style = "visibility: block;";
  document.getElementById('view').innerHTML = decodeURI(atob(getFromDatabase(getQueryVariable("p"))));
  document.getElementById('tidocs-edit').style = "visibility: block;";
  document.getElementById('tidocs-reader').style = "visibility: block;";
}

function editDoc() {
  localStorage.edit = atob(getFromDatabase(getQueryVariable("p")));
  window.location.href = "index.html?app=3";
  localStorage.tidocssave = getQueryVariable("p");
}

function docReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tidocs-edit').remove();
  document.getElementById('tidocs-reader').remove();
  document.getElementById('tidocs-header').remove();
}
