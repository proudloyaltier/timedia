function saveDoc() {
  var url = window.location.href + '&p=' + btoa(document.getElementsByTagName('h5')[0].innerHTML);
  
  window.location.href = url;
}

if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    document.getElementsByTagName('h5')[0].innerHTML = localStorage.edit;
    localStorage.removeItem('edit');
    throw new Error("Opened edit.");
  }
  
  document.getElementById('create').remove();
  document.getElementById('view').style = "visibility: block;";
  document.getElementById('view').innerHTML = atob(getQueryVariable("p"));
  document.getElementById('tidocs-edit').style = "visibility: block;";
}

function editDoc() {
  localStorage.edit = atob(getQueryVariable("p"));
  window.location.href = "index.html?app=3";
}
