function saveDoc() {
if (localStorage.tidocssave == undefined) {
  var tidocssave = generateRandString()
  storeInDatabase(tidocssave, document.getElementsByTagName('h5')[0].innerHTML)
  localStorage.tidocssave = tidocssave;
  urlRef.on("value", function(snapshot) {
  snapshot.forEach(function(child) {
  localStorage.owner = child.key;
  });
 });
} else {
  window.dbRef.child(localStorage.tidocssave).child(localStorage.owner).set(document.getElementsByTagName('h5')[0].innerHTML);
  var tidocssave = localStorage.tidocssave
}
  var url = "index.html?app=3"+ '&p=' + tidocssave;
  localStorage.recentUrl = url;
  if (localStorage.tidocssave == undefined && localStorage.autosaved == undefined) {
  localStorage.workToSaveTitle = document.getElementById('docsTitle').value;
  localStorage.workToSave = url;
  }
}

var tidocsContent = document.getElementsByClassName("tidocsContent")[0]; 

if ("addEventListener" in tidocsContent) {
   tidocsContent.addEventListener("keyup", saveDoc, false);
   if (localStorage.autosaved == undefined || localStorage.editAutoSave !== undefined) {
    localStorage.autosaved = true;
    if (localStorage.editAutoSave !== undefined) {
    localStorage.removeItem('editAutoSave');
    }
  }
}


if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    document.getElementById('docsTitle').remove();
    document.getElementsByTagName('h5')[0].innerHTML = decodeURI(localStorage.edit);
    localStorage.editAutoSave = localStorage.edit;
    localStorage.removeItem('edit');
    throw new Error("Opened edit.");
  }
  
  document.getElementById('create').remove();
  document.getElementById('view').style.display = "block";
  document.getElementById('tidocs-edit').style.display = "block";
  document.getElementById('tidocs-reader').style.display = "block";
  var urlRef = window.dbRef.child(getQueryVariable("p"));
  urlRef.on("value", function(snapshot) {
  snapshot.forEach(function(child) {
    localStorage.owner = child.key;
    if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
      window.location.href = 'index.html?app=7';
      alert("You do not have access to this document.")
    }
    document.getElementById('view').innerHTML = child.val();
    window.edit =  document.getElementById('view').innerHTML
    });
  });
}

function editDoc() {
  localStorage.edit = window.edit;
  window.location.href = "index.html?app=3";
  localStorage.tidocssave = getQueryVariable("p");
}

function docReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tidocs-edit').remove();
  document.getElementById('tidocs-reader').remove();
  document.getElementById('tidocs-header').remove();
}

window.addEventListener('DOMContentLoaded', function() {if(localStorage.editAutoSave == undefined){localStorage.removeItem('tidocssave');}}, false);
