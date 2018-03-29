function saveDoc() {
  if (localStorage.tidocssave == undefined && localStorage.editAutoSave == undefined) {
    var tidocssave = generateRandString();

    var plaintext = document.getElementById("tidocsContent").innerHTML;
    var tosave = CryptoJS.AES.encrypt(plaintext, localStorage.password) + "";

    storeInDatabase(tidocssave, tosave);
    localStorage.removeItem('tidocssave');
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

var tidocsContent = document.getElementById("tidocsContent");

if ("addEventListener" in tidocsContent) {
    if (localStorage.editAutoSave !== undefined) {
     localStorage.removeItem('editAutoSave');
    }
   tidocsContent.addEventListener("keyup", saveDoc, false);
  if (localStorage.autosaved == undefined) {
    localStorage.autosaved = true;
  }
}

if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    localStorage.editAutoSave = localStorage.edit;
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
      document.getElementById('view').innerHTML = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      window.edit = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);    
    });
  });
 }
}

function editDoc() {
 if (getQueryVariable('p') !== localStorage.tidocssave) {
   localStorage.removeItem('tidocssave')
 }
 localStorage.setItem('tidocssave', getQueryVariable("p"));
 localStorage.edit = window.edit;
 window.location.href = "index.html?app=3";
}

function docReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tidocs-edit').remove();
  document.getElementById('tidocs-reader').remove();
  document.getElementById('tidocs-header').remove();
}

/*function onloadIndex() {
  if (localStorage.editAutoSave == undefined && localStorage.edit == undefined) {
    alert('DELETE THE DOC')
    localStorage.removeItem('tidocssave');
  }
  hideTimer();
}*/
