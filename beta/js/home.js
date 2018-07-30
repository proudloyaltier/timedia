Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function changeName() {
  if (firebase.auth().currentUser.displayName != localStorage.getItem("name")) {
    firebase.auth().currentUser.updateProfile({
      displayName: localStorage.getItem("name")
    });
  }
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}

document.getElementById("userdrop").innerHTML = localStorage.name;

function launchApp(appname) {
  document.getElementById("home").style.display = "none";
  document.getElementById(appname).style.display = ""
}

if (localStorage.access == btoa(localStorage.name)) {
  if (getQueryVariable("app") == 1) {
    window.location.href = "?app=7";
  }
  if (getQueryVariable("app") == 2) {
    launchApp("messages");
    document.title = "TiChat - TiMedia";
  }

  if (getQueryVariable("app") == 3) {
    launchApp("tidocs");
    document.title = "TiDocs - TiMedia";
  }

  if (getQueryVariable("app") == 4) {
    launchApp("tisheets");
    document.title = "TiSheets - TiMedia";
  }

  if (getQueryVariable("app") == 5) {
    launchApp("tiritype");
    document.title = "Tiri Type - TiMedia";
  }
  if (getQueryVariable("app") == 7) {
    launchApp("tiles");
    document.title = "Tiles - TiMedia";
  }

  if (getQueryVariable("app") == 8) {
    launchApp("newapp");
    document.title = "New App - TiMedia";
  }

  if (getQueryVariable("app") == 10) {
    launchApp("tibookmarks");
    document.title = "TiBookmarks - TiMedia";
  }

  if (getQueryVariable("app") == 11) {
    launchApp("tismile");
    document.title = "TiSmile - TiMedia";
  }

  if (getQueryVariable("app") == 12) {
    launchApp("tiriShortcuts");
    document.title = "Tiri Shortcuts - TiMedia";
  }

  if (getQueryVariable("app") == 13) {
    launchApp("appstore");
    document.title = "App Store - TiMedia";
  }

  if (getQueryVariable("app") == 9) {
    launchApp("tislides");
    document.title = "TiSlides - TiMedia";
  }

} else {
  window.location.href = "login.html";
}

function checkCasioer() {
  var comment = document.getElementById("iChat-input").value;
  if (comment.toLowerCase().includes("casio")) {
    alert("Don't say Casio! Your comment has been deleted!");
    comment.value = "";
    window.location.href = "logout.html";
  }
}

if (getQueryVariable("app") == false || getQueryVariable("app") > 13) {
  setInterval(checkCasioer, 0);
  setInterval(changeName, 500);
}

var me = new iChatPlugin("me/me", function (data) {
  if (data.txt.startsWith("/me ")) {
    data.txt = data.txt.replace("/me", "***" + data.u);
    data.u = ""
  }
  return data;
}, "/me function for iChat");

iChat.onload = function () {
  iChat.registerPlugin(me);
}
