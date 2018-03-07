function saveDoc() {
if (localStorage.tidocssave == undefined) {
  var tidocssave = generateRandString()
  storeInDatabase(tidocssave, document.getElementsByTagName('h5')[0].innerHTML)
} else {
  window.dbRef.child(localStorage.tidocssave).child(localStorage.owner).set(document.getElementsByTagName('h5')[0].innerHTML);
  var tidocssave = localStorage.tidocssave
}
  var url = "index.html?app=3"+ '&p=' + tidocssave;
  localStorage.recentUrl = url;
  if (localStorage.tidocssave == undefined) {
  localStorage.workToSaveTitle = document.getElementById('docsTitle').value;
  localStorage.workToSave = url;
  } else {
    localStorage.removeItem('tidocssave');
  }
}

if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    document.getElementById('docsTitle').remove();
    document.getElementsByTagName('h5')[0].innerHTML = decodeURI(localStorage.edit);
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

$('h5').on('input', (e) => {
  saveDoc();
});
