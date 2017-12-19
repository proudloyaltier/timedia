function splitTilesForDeletion() {
  var tnorm = localStorage.files;
  window.tarr = tnorm.split(","); 
}

function findTile(tid) {
  return tarr[tid];
}

function deleteTile(ttd) {
  bootbox.confirm({
    message: "This is a confirm with custom button text and color! Do you like it?",
    buttons: {
        confirm: {
            label: 'Yes',
            className: 'btn-success'
        },
        cancel: {
            label: 'No',
            className: 'btn-danger'
        }
    },
    callback: function (result) {
       var deleteTiles = result;
    }
});
  document.getElementById('delete-single-tile').remove();
  if (deleteTiles == true) {
  splitTilesForDeletion();
  var tLen = tarr.length;
  var nt = "";
  
  for (i = 0; i < tLen; i++) {
    if(i == ttd) {
      
    } else {
      if(i > 1) {
        nt = nt + "," + findTile(i);
      } else {
        nt = nt + findTile(i);
      }
    }
  }
  localStorage.files = nt;
  save();
  window.location.href = "index.html?app=7";
  } else {
    window.location.reload();
  }
}

function resetTiles() {
  var resetTiles = confirm("Are you sure you want to delete all your Tiles?");
  
  if (resetTiles == true) {
    localStorage.removeItem('files');
    storeInDatabase("files", "");
    window.location.href = "index.html?app=7";
  }
}

function save() {
  storeInDatabase("files", localStorage.files);
}

function saveChat() {
  var chatName = prompt("Enter the name of this chat");
  var chatPassword = prompt("Enter the chat password");
  var chatCode = "index.html?app=" + chatPassword;
  addFile(chatName, chatCode)
}

function searchTiles(search) {
  document.getElementById("tiles-searchbox").innerHTML = "";
  
  if (search == "") {
      document.getElementById("tiles-tiles").style = "list-style: none;";
      document.getElementById("tiles-searchbox").style = "list-style: none; display: none;";
      loadTiles();
    
  } else {
    document.getElementById("tiles-tiles").style = "list-style: none; display: none;";
    document.getElementById("tiles-searchbox").style = "list-style: none;";
    
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
        if (localStorage.files.split(",")[i].toLowerCase().includes(search.toLowerCase())) {
          document.getElementById('tiles-searchbox').innerHTML = document.getElementById('tiles-searchbox').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-th-large"></span></center></h3></span></li>';
        }
    }
  }
}

function backupTiles(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
 
function restoreTiles() {
  var toRestore = prompt("Copy and paste the text from your backup");
  localStorage.files = toRestore;
  storeInDatabase("files", localStorage.files);
  window.location.href = "index.html?app=7"
}
  

function addFile(title, upload) {
  if (title == undefined && upload == undefined) {
    var title = prompt("File Name");
    var upload = prompt("Enter your URL");
  }

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
  } else {
    localStorage.files = title + "!!" + upload;
  }
  
  save();
}

function saveFromTiWork() {
  var title = localStorage.workToSaveTitle;
  var tosave = localStorage.workToSave;
  localStorage.removeItem('workToSave');
  localStorage.removeItem('workToSaveTitle');
  addFile(title, tosave);
}

function loadTiles() {
  
  document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
  
  if (localStorage.files !== "") {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
      document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-th-large"><br></span><br><br><button class="btn btn-danger" id="delete-single-tile" style="" onclick="deleteTile(' + i + ');">Delete</button></center></h3></span></li>';
    }
  
    document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<datalist id="tiles-listdiv">';
  
    document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + "</ul>";
  }
}

function refreshTiles() {
  getFromDatabase("files");
}

function redirect() {
  window.location.href = localStorage.recentUrl;
}


if (localStorage.files !== undefined && getQueryVariable('app') == 7) {
  loadTiles();
  setInterval(loadTiles, 1000);
}

if (localStorage.workToSave !== undefined) {
  saveFromTiWork();
}

if (getQueryVariable("bookmarkurl") !== false) {
  addFile(atob(getQueryVariable("bookmarktitle")), atob(getQueryVariable("bookmarkurl")));
  save();
  window.location.href = atob(getQueryVariable("bookmarkurl"));
}

refreshTiles();
