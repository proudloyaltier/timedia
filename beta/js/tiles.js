function resetTiles() {
  var resetTiles = confirm("Are you sure you want to delete all your Tiles?");
  
  if (resetTiles == true) {
    localStorage.removeItem('files');
    storeInDatabase("files", "");
    window.location.href = "index.html?app=7";
  }
}

function openFolder(id) {
  window.folderId = id;
  
  document.getElementById('tiles-tiles').style = "display: none;";
  document.getElementById('tiles-searchbox').style = "display: none;";
  document.getElementById('tiles-folder').style = "";
  document.getElementById('tiles-back').style = "";
  document.getElementById('tiles-mth').style = "";
  
  document.getElementById('tiles-folder').innerHTML = "";
  
  var folderData = atob(localStorage.files.split(",")[id].split("[")[1]);
  
    for (var i = 0; i < folderData.split(",").length; i++) {
      if (folderData.split(",")[i].split("!!")[0].charAt(0) == "–") {
        document.getElementById('tiles-folder').innerHTML = document.getElementById('tiles-folder').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="openFolder(' + i + ');"><h3><center>' + folderData.split(",")[i].split("!!")[0].substr(1) + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-folder-open"></span></center></h3></span></li>';
      } else {
        document.getElementById('tiles-folder').innerHTML = document.getElementById('tiles-folder').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + folderData.split(",")[i].split("!!")[1] + '\');"><h3><center>' + folderData.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-th-large"></span></center></h3></span></li>';
      }
    }
  
    document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + "</ul>";

}

function closeFolder() {
  document.getElementById('tiles-tiles').style = "";
  document.getElementById('tiles-searchbox').style = "display: none;";
  document.getElementById('tiles-folder').style = "display: none;";
  document.getElementById('tiles-back').style = "display: none;";
  document.getElementById('tiles-mth').style = "display: none;";
}

function save() {
  storeInDatabase("files", localStorage.files);
}

function moveFile() {
  var filename = prompt("File Name");
  
  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (filename == localStorage.files.split(",")[i].split("!!")[0]) {
      var filenum = i;
    }
  }
  
  if (filenum !== undefined) {
    var tiledata = localStorage.files.split(",")[filenum].split("!!")[1];
    var tilessplit = localStorage.files.split(",");
    
    localStorage.tilessplit[folderId] = localStorage.tilessplit[folderId].split("!!")[0] + "!!" + btoa(atob(localStorage.tilessplit[folderId].split("!!")[1]) + tiledata);
    
    localStorage.files = tilessplit;
    
    save();
    
  } else {
    alert("File not found.");
  }
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

function addFolder() {
  var title = prompt("Folder Name");
  var data = "";

  if (localStorage.files !== undefined) {
    localStorage.files = localStorage.files + ",–" + title + "!![" + btoa(data);
  } else {
    localStorage.files = "–" + title + "!![" + btoa(data);
  }
  
  save();
}

function saveFromTiWork() {
  var title = prompt("File Name");
  var tosave = localStorage.workToSave;
  localStorage.removeItem('workToSave');
  addFile(title, tosave);
}

function loadTiles() {
  
  document.getElementById('tiles-tiles').innerHTML = "You have no Tiles.";
  
  if (localStorage.files !== "") {
    document.getElementById('tiles-tiles').innerHTML = "";
    for (var i = 0; i < localStorage.files.split(",").length; i++) {
      if (localStorage.files.split(",")[i].split("!!")[0].charAt(0) == "–") {
        document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="openFolder(' + i + ');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0].substr(1) + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-folder-open"></span></center></h3></span></li>';
      } else {
        document.getElementById('tiles-tiles').innerHTML = document.getElementById('tiles-tiles').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="window.open(\'' + localStorage.files.split(",")[i].split("!!")[1] + '\');"><h3><center>' + localStorage.files.split(",")[i].split("!!")[0] + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-th-large"></span></center></h3></span></li>';
      }
    }
  
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
