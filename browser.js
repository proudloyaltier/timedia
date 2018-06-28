/*

TiTanium Alpha 6.8
By The TiMedia Team

https://github.com/proudloyaltier/timedia/tree/TiTanium

*/

var config = {
  apiKey: "AIzaSyC4jMK0UJIEujeqMl-FcUz5QeomXekV2P4",
  authDomain: "timedia-f129d.firebaseapp.com",
  databaseURL: "https://timedia-f129d.firebaseio.com",
  projectId: "timedia-f129d",
  storageBucket: "timedia-f129d.appspot.com",
  messagingSenderId: "180167533703"
};

firebase.initializeApp(config);
window.dbRef = firebase.database().ref();


function snapValue(value) {
  localStorage.setItem(window.gfdName, value.val());
  window.gfdName = null;
}

function errorLoading(err) {
  alert(err);
}

function getFromDatabase(name) {
  window.gfdName = name;
  window.dbRef.child(name).child(localStorage.name).on("value", snapValue, errorLoading);
}

function storeInDatabase(name, value) {
  window.dbRef.child(name).child(localStorage.name).set(value);
}

function signin() {
uname = document.getElementById("uname").value;
pword = document.getElementById("pword").value;
firebase.auth().signInWithEmailAndPassword(uname + "@timediatied.com", pword).catch(function(error) {
    alert("User name or password is incorrect!");
});
document.getElementById('login').style.display = "none";
document.getElementById('account-info').style.display = 'block';
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      user.providerData.forEach(function(profile) {
          document.getElementById('signout').style.display = 'none';
          localStorage.setItem("name", profile.email.replace("@timediatied.com", ""));
          localStorage.setItem("access", btoa(localStorage.name));
          document.getElementById('signout').style.display = 'block';
          var tilesLoad = setInterval(function() {
          document.getElementById('login').style.display = "none";
          document.getElementById('account-info').style.display = 'block';
          document.getElementById('user').innerHTML = "Account: " + localStorage.name;
          getFromDatabase("files")
          syncBookmarks();
          renderBookmarks();
          renderApps();
        }, 1000)
      });
    }
  });


function save() {
  storeInDatabase("files", localStorage.files);
}

function addFile(title, upload) {
  if (title == undefined && upload == undefined) {
    var title = prompt("File Name");
    var upload = prompt("Enter your URL");
  }

  if (localStorage.files !== undefined && localStorage.files !== "") {
    localStorage.files = localStorage.files + "," + title + "!!" + upload;
  } else {
    localStorage.files = title + "!!" + upload;
  }

  if (localStorage.files === "") {
    localStorage.files = title + "!!" + upload;
  }

  save();
}


function syncBookmarks() {
    var syncb = []
    for(var i = 0; i < localStorage.files.split(",").length; i++) {
        if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=10&l=") == true) {
        syncb.push(localStorage.files.split(",")[i].split("!!")[0] + "!!" + decodeURI(atob(localStorage.files.split(",")[i].split("!!")[1].split("?app=10&l=")[1])))
        }
    }
    return syncb
}

function signout() {
  window.location.reload();
  localStorage.removeItem('name')
  localStorage.removeItem('access')
  document.getElementById('signout').style.display = 'none';
  document.getElementById('user').style.display = 'none';
  localStorage.removeItem('files')
  firebase.auth().signOut().then(function() {
 }, function(error) {
  alert('Sign Out Error: ' + error);
 });
}

var version = "Alpha 6.8";
var homepage = "https://www.bing.com";
var searchUrl = "https://www.bing.com/search?q=";
var tabsbar = document.getElementById("tabsbar");
var bookmarksBar = document.getElementById("bookmarks");
var iframe = document.getElementById("tab0");
var urlBox = document.getElementById("urlbox");
var webframes = document.getElementById("webframes");
var settings = document.getElementById("settings");
var apps = document.getElementById("apps");
var installedApps = document.getElementById("installedApps");

var setupWindow = document.getElementById("setupWindow");
var browserWindow = document.getElementById("browserWindow");

var searchEngines = ["https://www.google.com/search?q=", "https://www.bing.com/search?q=", "https://search.yahoo.com/search?q=", "https://www.duckduckgo.com/search?q="];

if (localStorage.homepage !== undefined && localStorage.searchUrl !== undefined) {
  homepage = localStorage.homepage;
  searchUrl = localStorage.searchUrl;
}

var titabs = [homepage];
var titabstitles = [homepage];
var tihistory = [];
var tibookmarks = [];
var tiapps = [];

var settingsToggle = false;
var appsToggle = false;
var incognito = false;
var currentTab = 0;

var customUserAgent = null;

var tabtitlelength = 50;

if (localStorage.setup !== "true") {
  document.title = "Welcome to TiTanium";
  browserWindow.style.display = "none";
  setupWindow.style.display = "";
} else {
  loadData();
  renderBookmarks();

  iframe.src = homepage;
}

function openApp(i) {
window.open("data:text/html;charset=utf-8," + tiapps[i], "", "_blank")
}

function renderApps() {
  if (localStorage.tiapps !== undefined) {
    tiapps = localStorage.tiapps.split(",");
  }
    document.getElementById('tiapps-bar').innerHTML = "";
  for (var i=0; i < tiapps.length; i++) {
     document.getElementById('tiapps-bar').innerHTML += '<span oncontextmenu="deleteApp(' + i  + ')" onclick="openApp(' + i + ')" class="tiapp-icon ' + "glyphicon glyphicon-" + tiapps[i].split("<ticon style='display: none;'>")[1].replace('</ticon>' + tiapps[i].split('</ticon>')[1], "") + '"></span>';
  }
}

function uploadApp() {
    window.selector = document.createElement("input");
    selector.type = "file";
    selector.setAttribute("onchange", "uploadTIAPP()");
    selector.click();
}

function deleteApp(i) {
  var appConfirm = confirm("Are you sure you would like to delete this app?")
  if (appConfirm) {
    if (tiapps.length == 1) {
      var firstAppDeleted = true;
    }
    if (i > 0) {
   localStorage.tiapps = localStorage.tiapps.replace(tiapps[i] + ",", "")
  } else {
   localStorage.tiapps = localStorage.tiapps.replace(tiapps[i], "")
  }
   tiapps = localStorage.tiapps;
   if (firstAppDeleted) {
     localStorage.removeItem('tiapps');
     tiapps = [];
   }
   renderApps();
 }
}


function uploadTIAPP() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  tiapps.push(reader.result)
  localStorage.tiapps = tiapps + "";
  renderApps();
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

renderApps();

function toggleApps() {
  if (appsToggle === true) {
    settings.style.display = "none";
    apps.style.display = "none";
    iframe.style.display = "";
    settingsToggle = false;
    appsToggle = false;
  } else {
    iframe.style.display = "none";
    settings.style.display = "none";
    apps.style.display = "";
    renderApps();
    settingsToggle = false;
    appsToggle = true;
  }
}


function loadData() {
  tihistory = JSON.parse(localStorage.history);

  if (localStorage.homepage !== undefined && localStorage.searchUrl !== undefined) {
    homepage = localStorage.homepage;
    searchUrl = localStorage.searchUrl;
  }

  updateTabs();
  renderBookmarks();
}

function saveData() {
  localStorage.history = JSON.stringify(tihistory);
  localStorage.bookmarks = JSON.stringify(tibookmarks);
  localStorage.apps = JSON.stringify(tiapps);
  localStorage.homepage = homepage;
  localStorage.searchUrl = searchUrl;
}

function finishSetup() {
  document.title = "TiTanium";
  localStorage.setup = true;
  setupWindow.style.display = "none";
  browserWindow.style.display = "";

  renderBookmarks();
  loadData();
  renderBookmarks();

  iframe.src = homepage;
}

function addBookmark() {
  addFile(iframe.getTitle(), "index.html?app=10"+ '&l=' + btoa(encodeURI(iframe.getURL()))),
  save();
  saveData();
  renderBookmarks();
}

function exportBookmarks() {
  var a = document.createElement("a");

  a.href = "data:application/octet-stream;charset=utf-8;base64," + btoa(JSON.stringify(tibookmarks));
  a.download = "bookmarks.tbf";
  a.click();
}

function importBookmarksFile() {
  var fileSelector = document.createElement("input");

  fileSelector.type = "file";
  fileSelector.accept = ".html,.tbf";

  fileSelector.onchange = function() {
    var file = fileSelector.files[0];
    var filename = file.name.toLowerCase();
    var extension = filename.split(".");

    extension = extension[extension.length - 1];

    if (extension == "html" || extension == "tbf") {
      var reader = new FileReader();

      reader.readAsText(file, "UTF-8");
      reader.onload = function(e) {
        var content = e.target.result;

        if (extension == "html") {

          var text = content.split("<DT>");
          text.shift();

          for (var i = 0; i < text.length; i++) {
            var parser = new DOMParser();
            var el = parser.parseFromString(text[i], "text/html").firstChild.children[1].children[0];

            tibookmarks.push({
              "name": el.innerText,
              "url": el.href,
              "icon": el.getAttribute("icon")
            });
          }

          saveData();
          finishSetup();
        } else if (extension == "tbf") {
          tibookmarks = JSON.parse(content);

          saveData();
          finishSetup();
        }

        reader.onerror = function(e) {
          alert("Error reading file.");
          return false;
        }
      }
    } else {
      alert("This file type is not supported.");
    }
  }

  fileSelector.click();
}

function transferBookmarks() {
  alert("This feature will be available in the future.");
}

function importBookmarks() {
  switch (Number(document.querySelector("input[name=import]:checked").value)) {
    case 0:
      transferBookmarks();
      break;
    case 1:
      importBookmarksFile();
      break;
    case 2:
      tihistory = [];
      tibookmarks = [];
      saveData();

      finishSetup();
      break;
  }
}

function renderBookmarks() {
  bookmarksBar.innerHTML = "";
  if (firebase.auth().currentUser !== null && syncBookmarks() !== undefined && syncBookmarks() !== "") {
  for (var i = 0; i < syncBookmarks().length; i++) {
    bookmarksBar.innerHTML += '<a onclick="openBookmark(' + i + ')">' + syncBookmarks()[i].split("!!")[0] + '</a> ';
  }
 }
}

function openBookmark(id) {
  iframe.src = syncBookmarks()[id].split("!!")[1];
}

function deleteBookmark(id) {
  var todelete = confirm("Are you sure you would like to delete this bookmark?");

  if (todelete === true) {
    tibookmarks.splice(id, 1);
    renderBookmarks();
    saveData();
  }
}

function clearBookmarks() {
  var toclear = confirm("Are you sure you would like to clear your bookmarks?");

  if (toclear === true) {
    tibookmarks = [];
    renderBookmarks();
    saveData();
  }
}

function reload() {
  hideMenus();

  iframe.reload();
}

function updateUserAgent() {
  if (customUserAgent !== null) {
    iframe.setUserAgent(customUserAgent);
  } else if (incognito === true) {
    iframe.setUserAgent("Unknown");
  } else {
    iframe.setUserAgent("TiTanium");
  }
}

function updatePage() {
  if (document.activeElement !== urlBox) {
    if (iframe.getURL().includes(searchUrl)) {
      urlBox.value = decodeURI(iframe.getURL().split(searchUrl)[1]);
    } else {
      urlBox.value = iframe.getURL().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    }

    if (iframe.getURL().split(":")[0].toLowerCase() === "http") {
      urlBox.style.color = "red";
    } else {
      urlBox.style.color = "green";
    }
  }

  if (incognito === true) {
    iframe.executeJavaScript('__defineGetter__("navigator", function() { return({"doNotTrack": "1"}); });');
  }

  document.title = iframe.getTitle() + " - TiTanium";

  titabstitles[currentTab] = iframe.getTitle();
  titabs[currentTab] = iframe.getURL();
  updateTabs();

  saveData();
}

function setUserAgent(agent) {
  customUserAgent = agent;
}

function updateHistory() {
  if (incognito === false) {
    tihistory.push('<b>' + new Date().toLocaleTimeString() + "</b>: " + iframe.getURL());
  }
}

function blockAds() {
  iframe.executeJavaScript('for (var i = 0; i < document.getElementsByTagName("iframe").length; i++) { if (document.getElementsByTagName("iframe")[i].id.toLowerCase().includes("ad")) { document.getElementsByTagName("iframe")[i].style.display = "none"; } }');
}

function newTab(url) {
  hideMenus();

  if (typeof url !== "undefined") {
    titabs.push(url);
    titabstitles.push(url);
  } else {
    titabs.push(homepage);
    titabstitles.push(homepage);
  }

  document.getElementById("tab" + currentTab).style.display = "none";

  currentTab = titabs.length - 1;

  newframe = document.createElement("webview");
  newframe.src = titabs[currentTab];
  newframe.id = "tab" + currentTab;

  webframes.appendChild(newframe);

  newframe.addEventListener("did-start-loading", updateUserAgent);
  newframe.addEventListener("did-stop-loading", updatePage);
  newframe.addEventListener("did-stop-loading", blockAds);
  newframe.addEventListener("did-stop-loading", updateUserAgent);
  newframe.addEventListener("did-stop-loading", updateHistory);
  newframe.addEventListener("page-title-updated", updatePage);
  newframe.addEventListener("new-window", function(e) {
    newTab(e.url);
  });

  iframe = newframe;

  updateTabs();
}

function closeTab(id) {
  settings.style.display = "none";
  settingsToggle = false;

  document.getElementById("tab" + currentTab).style.display = "none";

  if (typeof titabs[id] !== "undefined") {
    if (id === titabs.length - 1) {
      currentTab = titabs.length - 2;
    } else {
      if (id !== 0) {
      currentTab = id - 1;
    } else if (titabs.length > 1 && id == 0) {
      currentTab = 1;
    }
    }
    if (id > 0) {
    titabs.splice(id, 1);
    titabstitles.splice(id, 1);
    } else {
    titabs.shift();
    titabstitles.shift();
    }

    if (titabs.length === 0) {
      window.close();
    }

    document.getElementById("tab" + id).style.display = "none";
    document.getElementById("tab" + currentTab).style.display = "";

    if (typeof titabs[id] === "undefined") {
      document.getElementById("tab" + id).remove();
    } else {
      document.getElementById("tab" + id).src = titabs[id];
    }
    if (id == 0) {
      document.getElementById("tab1").remove();
    }
    updateTabs();
  }
}

function openTab(id) {
  hideMenus();

  if (typeof titabs[id] !== "undefined") {
    iframe.style.display = "none";
    document.getElementById("tab" + id).style.display = "";

    iframe = document.getElementById("tab" + id);

    currentTab = id;
    updateTabs();
    updatePage();
  }
}

function updateTabs() {
  tabsbar.innerHTML = "";

  for (var i = 0; i < titabs.length; i++) {
    if (i === currentTab) {
      if (incognito === true) {
        tabsbar.innerHTML += '<span id="tabitem' + i + '" class="tab active dark" onclick="openTab(' + i + ')" title="' + titabstitles[i] + '">' + titabstitles[i].substring(0, tabtitlelength) + ' <span class="x" onclick="closeTab(' + i + ')">X</span></span> ';
      } else {
        tabsbar.innerHTML += '<span id="tabitem' + i + '" class="tab active" onclick="openTab(' + i + ')" title="' + titabstitles[i] + '">' + titabstitles[i].substring(0, tabtitlelength) + ' <span class="x" onclick="closeTab(' + i + ')">X</span></span> ';
      }
    } else {
      if (incognito === true) {
        tabsbar.innerHTML += '<span id="tabitem' + i + '" class="tab dark" onclick="openTab(' + i + ')"  title="' + titabstitles[i] + '">' + titabstitles[i].substring(0, tabtitlelength) + ' <span class="x" onclick="closeTab(' + i + ')">X</span></span> ';
      } else {
        tabsbar.innerHTML += '<span id="tabitem' + i + '" class="tab" onclick="openTab(' + i + ')"  title="' + titabstitles[i] + '">' + titabstitles[i].substring(0, tabtitlelength) + ' <span class="x" onclick="closeTab(' + i + ')">X</span></span> ';
      }
    }
  }

  urlBox.value = titabs[currentTab].replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  document.title = titabstitles[currentTab] + " - TiTanium";
}

function toggleSettings() {
  if (settingsToggle === true) {
    settings.style.display = "none";
    apps.style.display = "none";
    iframe.style.display = "";
    settingsToggle = false;
    appsToggle = false;
  } else {
    iframe.style.display = "none";
    apps.style.display = "none";
    settings.style.display = "";
    for (var i = 0; i < tihistory.length; i++) {
    document.getElementById('history-view').innerHTML = "<p class='history-item'>" + tihistory[i] + "</p>" + document.getElementById('history-view').innerHTML ;
    }
    document.getElementById('history-view').className = 'jumbotron';
    document.getElementById("homepageInput").value = homepage;
    document.getElementById("searchEngineInput").value = searchEngines.indexOf(searchUrl);
    settingsToggle = true;
    appsToggle = false;
  }
}

function clearHistory() {
  tihistory = [];
  saveData();
}

function hideMenus() {
  settings.style.display = "none";
  apps.style.display = "none";
  iframe.style.display = "";
  settingsToggle = false;
  appsToggle = false;
}

function incognitoMode() {
  hideMenus();

  if (incognito === false) {
    bar.classList.add("dark");
    bookmarksBar.classList.add("dark");

    for (var i = 0; i < document.getElementsByTagName("span").length; i++) {
      document.getElementsByTagName("span")[i].classList.add("dark");
    }

    incognito = true;
    updateTabs();
    reload();
  } else {
    bar.classList.remove("dark");
    bookmarksBar.classList.remove("dark");

    for (var i = 0; i < document.getElementsByTagName("span").length; i++) {
      document.getElementsByTagName("span")[i].classList.remove("dark");
    }

    incognito = false;
    updateTabs();
    reload();
  }
}

function openUrl() {
  hideMenus();

  urlBox.style.color = "";

  if (urlBox.value.split(":")[0] === "agent") {
    var agentString = urlBox.value.split(":");
    agentString.shift();
    agentString = agentString.join(" ");

    setUserAgent(agentString);
    reload();
  } else if (urlBox.value === "titanium://devtools" || urlBox.value === "titanium://devtools/") {
    iframe.openDevTools();
  } else if (urlBox.value === "titanium://crash" || urlBox.value === "titanium://crash/") {
    var a = "";

    while (1) {
      a += "crash ";
      console.log(a);
    }
  } else if (urlBox.value === "titanium://quit" || urlBox.value === "titanium://quit/") {
    window.close();
  } else {
    if (urlBox.value === "localhost" || urlBox.value === "localhost/") {
      iframe.src = "http://localhost/";
    } else if ((urlBox.value.includes(".") && urlBox.value.split(" ").length === 1) || urlBox.value.includes("http://") || urlBox.value.includes("https://")) {
      if (urlBox.value.includes("http://") || urlBox.value.includes("https://")) {
        iframe.src = urlBox.value;
      } else {
        iframe.src = "http://" + urlBox.value;
      }
    } else {
      iframe.src = searchUrl + urlBox.value;
    }

    currentPage = tihistory.length;
  }

  urlBox.blur();

  document.title = iframe.src + " - TiTanium";
  urlBox.value = iframe.src.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");

  titabs[currentTab] = iframe.src;
  titabstitles[currentTab] = iframe.src;

  updateTabs();
}

function setHomepage(url) {
  homepage = url;
  saveData();
}

function setSearchEngine(value) {
  searchUrl = searchEngines[value];
  saveData();
}

function backPage() {
  hideMenus();

  iframe.executeJavaScript("window.history.back();");
}

function forPage() {
  hideMenus();

  iframe.executeJavaScript("window.history.forward();");
}

function clearData() {
  localStorage.clear();
  window.location.reload();
}

function lockTab() {
    localStorage.lockCode = CryptoJS.AES.encrypt("locked", document.getElementById('lock-password').value)
    localStorage.locked = true;
    localStorage.page = document.getElementById('lock-page').value
    window.location.reload();
}

function showUnlockTab() {
    document.getElementById('lock-settings').style.display = 'block';
    document.getElementById('webframes').style.display = 'none';
}

function unlockTab() {
  if (CryptoJS.AES.decrypt(localStorage.lockCode, document.getElementById('unlock-password').value).toString(CryptoJS.enc.Utf8) == "locked") {
    localStorage.removeItem('locked');
    localStorage.removeItem('lockCode');
    document.getElementById('lock-settings').style.display = 'none';
    document.getElementById('webframes').style.display = 'block';
    localStorage.removeItem(localStorage.page)
    window.location.reload();
  } else {
    document.getElementById('webframes').style.display = 'block';
  }
}

iframe.addEventListener("did-start-loading", updateUserAgent);
iframe.addEventListener("did-stop-loading", updatePage);
iframe.addEventListener("did-stop-loading", blockAds);
iframe.addEventListener("did-stop-loading", updateUserAgent);
iframe.addEventListener("did-stop-loading", updateHistory);
iframe.addEventListener("page-title-updated", updatePage);
iframe.addEventListener("new-window", function(e) {
  newTab(e.url);
});

window.onload = function() {
  if (localStorage.locked) {
    document.getElementById('lock-icon').style.display = 'block';
    document.getElementById('bar').style.display = 'none';
    urlbox.value = localStorage.page;
    openUrl()
    document.getElementById('locked-bar').style.display = 'block';
   }
}
