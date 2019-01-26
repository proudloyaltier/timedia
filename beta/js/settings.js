function updateSettings() {
  localStorage.bgImg = document.getElementById("backgroundImg").value;
  localStorage.barColor = document.getElementById("barColor").value;
  location.reload();
}

if (localStorage.bgImg !== undefined) {
  document.getElementById("body").background = localStorage.bgImg;
}

if (localStorage.barColor !== undefined) {
  document.getElementById("timedia-nav-bar").style = "background-color: #" + localStorage.barColor + ";";
}

function lastTile() {
  window.location.href = localStorage.recentUrl;
}

function darkMode() {
  body.className = "dark-mode";
}

function darkModeOff() {
  localStorage.darkmode = false;
  window.location.reload();
}

function setDarkMode() {
  localStorage.darkmode = true;
  window.location.reload();
}

function openTiSmileLink() {
window.location.href = "index.html?app=11";
}

document.getElementById("settings-back-arrow").innerHTML = "<";

var settingsPage = "settings";

var settings = {
  settings: {
    Account: '<h6 style="font-size: 150%">Change Password </h6><input class="form-control" type="text" id="passchange1" placeholder="New Password"><input class="form-control" type="text" id="passchange2" placeholder="Confirm New Password"><br><button onclick="changePasswordButton();" class="btn btn-primary">Change Password</button><br>',
    Tiles: '<h5>Tiles</h5><button onclick="lastTile()" class="btn btn-success">Open The Last Opened Tile</button><br><br><button onclick="resetTiles()" class="btn btn-danger">Reset Tiles</button><br>',
    Personalization: '<h6 style="font-size: 150%"> Theming Options </h6> Background Image<br><input class="form-control" type="text" id="backgroundImg"><br> Bar Color<br><input id="barColor" class="jscolor form-control" value="2296f3"><br><button onclick="updateSettings()" class="btn btn-success">Save Theme</button><br><br><button onclick="setDarkMode();" class="btn btn-primary" id="dark-mode-on">Turn On Dark Mode</button><button onclick="darkModeOff();" class="btn btn-primary" id="dark-mode-off">Turn Off Dark Mode</button>',
  }
};

function changeSettingsPage() {
  var pageOn = settings;
  for (var i = 0; i < settingsPage.split("/").length; i++) {
    pageOn = pageOn[settingsPage.split("/")[i]];
  }
  
  if ((typeof pageOn).toLowerCase() == "object") {
    document.getElementById('settings-sections').innerHTML = "";
    for (var i = 0; i < Object.keys(pageOn).length; i++) {
      var newSection = document.createElement("div");
      newSection.innerHTML = Object.keys(pageOn)[i];
      newSection.key = Object.keys(pageOn)[i];
      newSection.onclick = function() {
        settingsPage += "/" + this.key;
        changeSettingsPage();
      };
      document.getElementById('settings-sections').appendChild(newSection);
    }
  } else {
    document.getElementById('settings-sections').innerHTML = pageOn;
  }
  if(settingsPage == "settings") {
    document.getElementById("settings-back-arrow").style.display = "none";
  } else {
    document.getElementById("settings-back-arrow").style.display = "block";
  }
 if (localStorage.getItem("darkmode") == "true") {
  darkMode();
  document.getElementById("dark-mode-on").remove();
  } else {
  document.getElementById("dark-mode-off").remove();
  }
  jscolor.installByClassName('jscolor form-control')
}

function backSettings() {
  settingsPage = settingsPage.replace("/" + settingsPage.split("/")[settingsPage.split("/").length - 1], "");
  changeSettingsPage();
}

function closeSettings() {
  document.getElementById("settings").style.right = "-251px";
  document.getElementById("settings").style.display = "none";
}

function openSettings() {
  document.getElementById("settings").style.display = "block";
  document.getElementById("settings").style.right = "0px";
}

function toggleSettings() {
  if(parseInt(document.getElementById("settings").style.right) == 0) {
    closeSettings();
  } else {
    openSettings();
  }
}

document.getElementById("settings-uname").innerText = localStorage.name;
changeSettingsPage();
