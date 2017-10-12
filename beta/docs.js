function addFile(title, url) {

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + "!!" + url;
  } else {
    localStorage.files = title + "!!" + url;
  }
  storeInDatabase("files", localStorage.files)
}

function saveDoc() {
  var URL = window.location.href + '&p=' + btoa(encodeURI(document.getElementsByTagName('h5')[0].innerHTML));
  addFile(prompt("Title"), URL)
  window.location.href = "?app=6";
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
}

function editDoc() {
  localStorage.edit = atob(getQueryVariable("p"));
  window.location.href = "index.html?app=3";
}
