function saveDoc() {
  if (localStorage.tidocssave == undefined) {
    var tidocssave = generateRandString();

    var plaintext = document.getElementById("tidocsContent").innerHTML;
    var tosave = CryptoJS.AES.encrypt(plaintext, localStorage.password) + "";

    storeInDatabase(tidocssave, tosave);
    localStorage.tidocssave = tidocssave;
    var urlRef = window.dbRef.child(tidocssave);
    urlRef.on("value", function(snapshot) {
      snapshot.forEach(function(child) {
        localStorage.owner = child.key;
      });
    });
    var url = "index.html?app=3" + '&p=' + tidocssave;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = document.getElementById('docsTitle').value;
    localStorage.workToSave = url;
  } else {
    var plaintext = document.getElementById("tidocsContent").innerHTML;
    var tosave = CryptoJS.AES.encrypt(plaintext, localStorage.password) + "";

    window.dbRef.child(localStorage.tidocssave).child(localStorage.owner).set(tosave);
    var tidocssave = localStorage.tidocssave;
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
    document.getElementById("tidocsContent").innerHTML = localStorage.edit;
    localStorage.removeItem('edit');
  } else {

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
        alert("You do not have access to this document.");
      }
      
      localStorage.tidocssave = getQueryVariable("p");
      document.getElementById('view').innerHTML = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      window.edit = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);    
      localStorage.editAutoSave = window.edit;
    });
  });
 }
}

function editDoc() {
  localStorage.edit = window.edit;
  window.location.href = "index.html?app=3";
}

function docReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tidocs-edit').remove();
  document.getElementById('tidocs-reader').remove();
  document.getElementById('tidocs-header').remove();
}

if (getQueryVariable("app") !== "3") {
  if (localStorage.editAutoSave == undefined) {
    localStorage.removeItem('tidocssave');
  }
}
