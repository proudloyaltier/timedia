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


firebase.auth().onAuthStateChanged(function (user) {
  setInterval(function () {
    if (firebase.auth().currentUser) {
      if (localStorage.name !== user.email.replace("@timediatied.com", "")) {
        window.localStorage.clear();
        window.location.href = "logout.html";
      }
    }
  }, 100)
})

if (localStorage.access == btoa(localStorage.name)) {
  switch (Number(getQueryVariable("app"))) {
    case 1:
      window.location.replace("?app=7");
      break;
    case 2:
      document.title = "TiChat - TiMedia";
      launchApp("messages");
      break;
    case 3:
      document.title = "TiDocs - TiMedia";
      launchApp("tidocs");
      break;
    case 4:
      document.title = "TiSheets - TiMedia";
      launchApp("tisheets");
      break;
    case 5:
      document.title = "Tiri Type - TiMedia";
      launchApp("tiritype");
      break;
    case 7:
      document.title = "Tiles - TiMedia";
      launchApp("tiles");
      break;
    case 8:
      document.title = "New App - TiMedia";
      launchApp("newapp");
      break;
    case 9:
      launchApp("tislides");
      document.title = "TiSlides - TiMedia";
      break;
    case 10:
      document.title = "TiBookmarks - TiMedia";
      launchApp("tibookmarks");
      break;
    case 11:
      document.title = "TiSmile - TiMedia";
      launchApp("tismile");
      break;
    case 12:
      document.title = "Tiri Shortcuts - TiMedia";
      launchApp("tiriShortcuts");
      break;
    case 13:
      document.title = "App Store - TiMedia";
      launchApp("appstore");
      break;
    default:
      launchApp("home");
      break;
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
