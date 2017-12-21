
function saveDoc() {
  var url = "index.html?app=3"+ '&p=' + btoa(encodeURI(document.getElementsByTagName('h5')[0].innerHTML));
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
  document.getElementById('view').innerHTML = decodeURI(atob(getQueryVariable("p")));
  document.getElementById('tidocs-edit').style = "visibility: block;";
  document.getElementById('tidocs-reader').style = "visibility: block;";
}

function editDoc() {
  localStorage.edit = atob(getQueryVariable("p"));
  window.location.href = "index.html?app=3";
}

function docReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tidocs-edit').remove();
}
