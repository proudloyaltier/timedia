var tidocsContent = document.getElementsById("tidocsContent");
var tidocsTitle = document.getElementById("tidocsTitle");

var isFirefox = typeof InstallTrigger !== "undefined";
var isIE = /*@cc_on!@*/ false || !!document.documentMode;

function tiPrint() {
  if (isFirefox || isIE) {
    if (isFirefox) {
      if (localStorage.setupOneClick !== "true") {
        swal.setDefaults({
          confirmButtonText: "Next &rarr;",
          showCancelButton: true,
          progressSteps: ["1", "2", "3"]
        });

        var steps = [{
            html: "Visit <b>about:config</b> in a new tab."
          },
          {
            html: "Right Click > New Boolean > <b>print.always_print_silent</b> > true"
          },
          {
            text: "You can now use TiPrint!",
          }
        ]

        swal.queue(steps).then((result) => {
          swal.resetDefaults();
          localStorage.setItem("setupOneClick", true);
        });
      } else {
        window.print();
        swal("Success", "Your document has been printed.", "success");
        localStorage.setItem("setupOneClick", false);
      }
    } else if (isIE) {
      Print();
      swal("Success", "Your document has been printed.", "success");
    }
  }
}

document.addEventListener("keydown", function(e) {
  if ((e.ctrlKey || e.metaKey) && (e.charCode === 80)) {
    tiPrint();
    e.cancelBubble = true;
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

function saveDoc() {
  if (localStorage.tidocssave == undefined) {
    var tidocssave = generateRandString()
    window.dbRef.child("docs").child(tidocssave).child(localStorage.name).set(CryptoJS.AES.encrypt(tidocsContent.innerHTML, localStorage.password).toString());

    localStorage.tidocssave = tidocssave;
    var urlRef = window.dbRef.child("docs").child(tidocssave);
    urlRef.on("value", function(snapshot) {
      snapshot.forEach(function(child) {
        localStorage.owner = child.key;
      });
    });

    var url = "index.html?app=3&p=" + tidocssave;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = tidocsTitle.value;
    localStorage.workToSave = url;
  } else {
    window.dbRef.child("docs").child(localStorage.tidocssave).child(localStorage.owner).set(CryptoJS.AES.encrypt(document.getElementById('tidocsContent').innerHTML, localStorage.password) + "");
    var tidocssave = localStorage.tidocssave
  }
}

if ("addEventListener" in tidocsContent) {
  tidocsContent.addEventListener("keyup", saveDoc, false);
  if (localStorage.autosaved == undefined || localStorage.editAutoSave !== undefined) {
    localStorage.autosaved = true;
    if (localStorage.editAutoSave !== undefined) {
      localStorage.removeItem('editAutoSave');
    }
  }
}

function editDoc() {
  localStorage.edit = window.edit;
  window.location.href = "index.html?app=3";
  localStorage.tidocssave = getQueryVariable("p");
}

function docReader() {
  document.getElementById("timedia-nav-bar").style.display = "none";
  document.getElementById("tidocs-edit").style.display = "none";
  document.getElementById("tidocs-reader").style.display = "none";
  document.getElementById("tidocs-header").style.display = "none";
}

if (typeof localStorage.editAutoSave === "undefined") {
  localStorage.removeItem("tidocssave");
}

if (getQueryVariable("p") !== false || localStorage.edit !== undefined) {
  if (localStorage.edit !== undefined) {
    tidocsTitle.style.display = "none";
    tidocsContent.innerHTML = localStorage.edit;
    localStorage.editAutoSave = localStorage.edit;
    localStorage.removeItem("edit");
  } else {
    document.getElementById("create").style.display = "none";
    document.getElementById("view").style.display = "";
    document.getElementById("tidocs-edit").style.display = "";
    document.getElementById("tidocs-reader").style.display = "";

    var urlRef = window.dbRef.child("docs").child(getQueryVariable("p"));
    urlRef.on("value", function(snapshot) {
      snapshot.forEach(function(child) {
        localStorage.owner = child.key;

        if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
          window.location.href = "index.html?app=7";
        }

        document.getElementById("view").innerHTML = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
        window.edit = document.getElementById("view").innerHTML;
      });
    });
  }
}

if (isFirefox || isIE) {
  document.getElementById("legacyPrintButton").style.display = "none";
  document.getElementById("printButton").style.display = "";
}
