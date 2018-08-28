/*

TiTanium Alpha 14
By The TiMedia Team

https://github.com/proudloyaltier/timedia/tree/TiTanium

*/

const version = "Alpha 14";
var homepage = "https://www.bing.com";
var searchUrl = "https://www.bing.com/search?q=";

const tabsbar = document.getElementById("tabsbar");
const bookmarksBar = document.getElementById("bookmarks");
const webframe = document.getElementById("tab0");
const urlBox = document.getElementById("urlbox");
const webframes = document.getElementById("webframes");
const settings = document.getElementById("settings");
const apps = document.getElementById("apps");
const installedApps = document.getElementById("installedApps");
const username = document.getElementById("username");
const password = document.getElementById("password");
const historyView = document.getElementById("historyView");

var setupWindow = document.getElementById("setupWindow");
var browserWindow = document.getElementById("browserWindow");

var searchEngines = ["https://www.google.com/search?q=", "https://www.bing.com/search?q=", "https://search.yahoo.com/search?q=", "https://www.duckduckgo.com/search?q="];

if (typeof localStorage.homepage !== "undefined" && typeof localStorage.searchUrl !== "undefined") {
  homepage = localStorage.homepage;
  searchUrl = localStorage.searchUrl;
}

var tiTabs = [homepage];
var tiTabsTitles = [homepage];
var tihistory = [];
var tiApps = [];

var settingsToggle = false;
var appsToggle = false;
var incognito = false;
var currentTab = 0;
var customUserAgent;
var tabTitleLength = 50;

if (localStorage.setup !== "true") {
  document.title = "Welcome to TiTanium";
  browserWindow.style.display = "none";
  setupWindow.style.display = "";
} else {
  loadData();
  renderBookmarks();

  webframe.src = homepage;
}

// App Functions

function openApp(i) {
  window.open("data:text/html;charset=utf-8," + tiApps[i].content, "", "_blank")
}

function renderApps() {
  if (localStorage.tiApps !== undefined && localStorage.tiApps !== "[]") {
    tiApps = JSON.parse(localStorage.tiApps)
  }
  
  document.getElementById("tiApps-bar").innerHTML = "";
  for (var i = 0; i < tiApps.length; i++) {
    document.getElementById("tiApps-bar").innerHTML += "<span draggable='true' ondragstart='appDrag(event, " + i + ")' oncontextmenu='deleteApp(" + i + ")' onclick='openApp(" + i + ")' title='" + tiApps[i].name + "' class='tiapp-icon glyphicon glyphicon-" + tiApps[i].icon + "'></span>";
  }
}

function uploadApp() {
  window.selector = document.createElement("input");
  selector.type = "file";
  selector.setAttribute("onchange", "uploadTIAPP()");
  selector.click();
}

function deleteApp(i) {
  var appConfirm = confirm("Are you sure you would like to delete this app?");

  if (appConfirm === true) {
    tiApps = tiApps.splice(tiApps[i], 1);
    localStorage.tiApps = JSON.stringify(tiApps);
    tiApps = localStorage.tiApps;

    if (tiApps.length === 0) {
      localStorage.removeItem("tiApps");
      tiApps = [];
    }

    renderApps();
  }
}

function installAppWeb(app) {
  tiApps.push({
    "content": app,
    "icon": app.split("<ticon style='display: none;'>")[1].replace("</ticon>" + app.split("</ticon>")[1], "")
  })
  localStorage.tiApps = JSON.stringify(tiApps)
}

function uploadTiApp() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function() {
    tiApps.push({
      "name": selector.value.split(/(\\|\/)/g).pop(),
      "content": reader.result,
      "icon": reader.result.split("<ticon style='display: none;'>")[1].replace("</ticon>" + reader.result.split("</ticon>")[1], "")
    })
    localStorage.tiApps = JSON.stringify(tiApps)
    renderApps();
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

renderApps();

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
  localStorage.apps = JSON.stringify(tiApps);
  localStorage.homepage = homepage;
  localStorage.searchUrl = searchUrl;
}

function addBookmark() {
  addFile(webframe.getTitle(), "index.html?app=10" + "&l=" + btoa(encodeURI(webframe.getURL())));
  saveTiles();
  saveData();
  renderBookmarks();
}

function renderBookmarks() {
  bookmarksBar.innerHTML = "";
  if (firebase.auth().currentUser !== null && syncBookmarks() !== undefined && syncBookmarks() !== "") {
    for (var i = 0; i < syncBookmarks().length; i++) {
      bookmarksBar.innerHTML += "<a onclick='openBookmark(" + i + ")'>" + syncBookmarks()[i].name + "</a> ";
    }
  }
}

function openBookmark(id) {
  webframe.src = syncBookmarks()[id].content;
}

function transferBookmarks() {
  alert("This feature will be available in the future.");
}

function updateUserAgent() {
  if (customUserAgent !== null) {
    webframe.setUserAgent(customUserAgent);
  } else if (incognito === true) {
    webframe.setUserAgent("Unknown");
  } else {
    webframe.setUserAgent("TiTanium");
  }
}

function updatePage() {
  if (document.activeElement !== urlBox) {
    if (webframe.getURL().includes(searchUrl)) {
      urlBox.value = decodeURI(webframe.getURL().split(searchUrl)[1]);
    } else {
      urlBox.value = webframe.getURL().replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    }

    if (webframe.getURL().split(":")[0].toLowerCase() === "http") {
      urlBox.style.color = "red";
    } else {
      urlBox.style.color = "green";
    }
  }

  if (incognito === true) {
    webframe.executeJavaScript("__defineGetter__('navigator', function() { return({'doNotTrack ': '1'}); });");
  }

  document.title = webframe.getTitle() + " - TiTanium";

  tiTabsTitles[currentTab] = webframe.getTitle();
  tiTabs[currentTab] = webframe.getURL();
  updateTabs();

  saveData();
}

// TiSets

function openInTiSets(app) {
  newTab("data:text/html;charset=utf-8," + "<title>" + tiApps[app].name.replace(".tiapp", "") + "</title>" + tiApps[app].content)
  updateTabs()
}

// App Drop Functions

function allowAppDrop(ev) {
  ev.preventDefault();
}

function appDrag(ev, app) {
  ev.dataTransfer.setData("app", app);
}

function appDrop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("app");
  openInTiSets(data)
}

// Tab Functions

function newTab(url) {
  hideMenus();

  if (typeof url !== "undefined" && url.startsWith("installapp://")) {
    var appToInstall = url.split("installapp://")[1]
    installAppWeb(appToInstall)
  } else {
    if (typeof url !== "undefined") {
      tiTabs.push(url);
      tiTabsTitles.push(url);
    } else {
      tiTabs.push(homepage);
      tiTabsTitles.push(homepage);
    }

    document.getElementById("tab" + currentTab).style.display = "none";

    currentTab = tiTabs.length - 1;

    newframe = document.createElement("webview");
    newframe.src = tiTabs[currentTab];
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

    webframe = newframe;

    updateTabs();
  }
}

function openTab(id) {
  hideMenus();

  if (typeof tiTabs[id] !== "undefined") {
    webframe.style.display = "none";
    document.getElementById("tab" + id).style.display = "";

    webframe = document.getElementById("tab" + id);

    currentTab = id;
    updateTabs();
    updatePage();
  }
}

function closeTab(id) {
  settings.style.display = "none";
  settingsToggle = false;

  document.getElementById("tab" + currentTab).style.display = "none";

  if (typeof tiTabs[id] !== "undefined") {
    if (id === tiTabs.length - 1) {
      currentTab = tiTabs.length - 2;
    } else {
      if (id !== 0) {
        currentTab = id - 1;
      } else if (tiTabs.length > 1 && id == 0) {
        currentTab = 1;
      }
    }
    if (id > 0) {
      tiTabs.splice(id, 1);
      tiTabsTitles.splice(id, 1);
    } else {
      tiTabs.shift();
      tiTabsTitles.shift();
    }

    if (tiTabs.length === 0) {
      window.close();
    }

    document.getElementById("tab" + id).style.display = "none";
    document.getElementById("tab" + currentTab).style.display = "";

    if (typeof tiTabs[id] === "undefined") {
      document.getElementById("tab" + id).remove();
    } else {
      document.getElementById("tab" + id).src = tiTabs[id];
    }
    if (id == 0) {
      document.getElementById("tab1").remove();
    }
    updateTabs();
  }
}

function updateTabs() {
  tabsbar.innerHTML = "";

  for (var i = 0; i < tiTabs.length; i++) {
    if (i === currentTab) {
      if (incognito === true) {
        tabsbar.innerHTML += "<span id='tabitem" + i + "class='tab active dark' onclick='openTab(" + i + ")' title='" + tiTabsTitles[i] + "'>" + tiTabsTitles[i].substring(0, tabTitleLength) + " <span class='x' onclick='closeTab(" + i + ")'>X</span></span>";
      } else {
        tabsbar.innerHTML += "<span id='tabitem" + i + "class='tab active' onclick='openTab(" + i + ")' title='" + tiTabsTitles[i] + "'>" + tiTabsTitles[i].substring(0, tabTitleLength) + " <span class='x' onclick='closeTab(" + i + ")'>X</span></span>";
      }
    } else {
      if (incognito === true) {
        tabsbar.innerHTML += "<span id='tabitem" + i + "class='tab dark' onclick='openTab(" + i + ")' title='" + tiTabsTitles[i] + "'>" + tiTabsTitles[i].substring(0, tabTitleLength) + " <span class='x' onclick='closeTab(" + i + ")'>X</span></span>";
      } else {
        tabsbar.innerHTML += "<span id='tabitem" + i + "class='tab' onclick='openTab(" + i + ")' title='" + tiTabsTitles[i] + "'>" + tiTabsTitles[i].substring(0, tabTitleLength) + " <span class='x' onclick='closeTab(" + i + ")'>X</span></span>";
      }
    }
  }

  urlBox.value = tiTabs[currentTab].replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  document.title = tiTabsTitles[currentTab] + " - TiTanium";
}

// Menu Toggles

function toggleApps() {
  if (appsToggle === true) {
    settings.style.display = "none";
    apps.style.display = "none";
    webframe.style.display = "";
    settingsToggle = false;
    appsToggle = false;
  } else {
    webframe.style.display = "none";
    settings.style.display = "none";
    apps.style.display = "";
    renderApps();
    settingsToggle = false;
    appsToggle = true;
  }
}

function toggleSettings() {
  if (settingsToggle === true) {
    settings.style.display = "none";
    apps.style.display = "none";
    webframe.style.display = "";
    settingsToggle = false;
    appsToggle = false;
  } else {
    webframe.style.display = "none";
    apps.style.display = "none";
    settings.style.display = "";

    for (var i = 0; i < tihistory.length; i++) {
      historyView.innerHTML = "<p class='history - item " > " + tihistory[i] + " < /p>" + historyView.innerHTML;
    }

    historyView.className = "jumbotron";

    document.getElementById("homepageInput").value = homepage;
    document.getElementById("searchEngineInput").value = searchEngines.indexOf(searchUrl);

    settingsToggle = true;
    appsToggle = false;
  }
}


// Core Functions and Features

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
    webframe.openDevTools();
  } else if (urlBox.value === "titanium://crash" || urlBox.value === "titanium://crash/") {
    var a = "";

    while (1) {
      a += "crash ";
      console.log(a);
    }
  } else if (urlBox.value === "titanium://quit" || urlBox.value === "titanium://quit/") {
    window.close();
  } else if (urlbox.value.startsWith("installapp://")) {
    var appToInstall = urlbox.value.split("installapp://")[1]
    installAppWeb(appToInstall)
  } else {
    if (urlBox.value === "localhost" || urlBox.value === "localhost/") {
      webframe.src = "http://localhost/";
    } else if ((urlBox.value.includes(".") && urlBox.value.split(" ").length === 1) || urlBox.value.includes("http://") || urlBox.value.includes("https://")) {
      if (urlBox.value.includes("http://") || urlBox.value.includes("https://") || urlBox.value.includes("file:///")) {
        webframe.src = urlBox.value;
      } else {
        webframe.src = "http://" + urlBox.value;
      }
    } else {
      webframe.src = searchUrl + urlBox.value;
    }

    currentPage = tihistory.length;
  }

  urlBox.blur();
  document.title = webframe.src + " - TiTanium";
  urlBox.value = webframe.src.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  tiTabs[currentTab] = webframe.src;
  tiTabsTitles[currentTab] = webframe.src;
  updateTabs();
}

function backPage() {
  hideMenus();

  webframe.executeJavaScript("window.history.back();");
}

function forwardPage() {
  hideMenus();

  webframe.executeJavaScript("window.history.forward();");
}

function reload() {
  hideMenus();

  webframe.reload();
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

function setUserAgent(agent) {
  customUserAgent = agent;
}

function updateHistory() {
  if (incognito === false) {
    tihistory.push("<b>" + new Date().toLocaleTimeString() + "</b>: " + webframe.getURL());
  }
}

function blockAds() {
  webframe.executeJavaScript("for(var i=0;i<document.getElementsByTagName('webframe').length;i++)document.getElementsByTagName('webframe')[i].id.toLowerCase().includes('ad')&&(document.getElementsByTagName('webframe')[i].style.display='none');");
}

function hideMenus() {
  settings.style.display = "none";
  apps.style.display = "none";
  webframe.style.display = "";

  settingsToggle = false;
  appsToggle = false;
}

// Settings Functions

function setHomepage(url) {
  homepage = url;
  saveData();
}

function setSearchEngine(value) {
  searchUrl = searchEngines[value];
  saveData();
}

function clearData() {
  localStorage.clear();
  window.location.reload();
}

// Tab Lock Functions

function lockTab() {
  localStorage.lockCode = MD5(document.getElementById("lockPassword").value);
  localStorage.locked = true;
  localStorage.page = document.getElementById("lockPage").value;
  window.location.reload();
}

function unlockTab() {
  if (MD5(document.getElementById("unlockPassword").value) === localStorage.lockCode) {
    localStorage.removeItem("locked");
    localStorage.removeItem("lockCode");
    document.getElementById("lockSettings").style.display = "none";
    document.getElementById("webframes").style.display = "";
    localStorage.removeItem(localStorage.page);
    window.location.reload();
  } else {
    document.getElementById("webframes").style.display = "";
  }
}

function showUnlockTab() {
  document.getElementById("lockSettings").style.display = "";
  document.getElementById("webframes").style.display = "none";
}

// Misc. Functions

function openLocalFile() {
  var fileSelector = document.createElement("input");
  fileSelector.type = "file";
  fileSelector.onchange = function() {
    newTab("file:///" + window.localselector.files[0].path);
  }

  fileSelector.click();
}

function checkOnlineStatus() {
  if (!navigator.onLine) {
    webframes.style.display = "none";
    offline.style.display = "";
  } else {
    offline.style.display = "none";
    webframes.style.display = "";
  }
}

if (localStorage.locked === "true") {
  document.getElementById("lockIcon").style.display = "block";
  document.getElementById("bar").style.display = "none";
  urlBox.value = localStorage.page;
  openUrl();
  document.getElementById("lockedBar").style.display = "block";
}

// Firebase Functions

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

function loadTiles() {
  window.dbRef.child("files").child(localStorage.name).on("value", function(value) {
    localStorage.files = JSON.stringify(value.val());
  }, function(error) {
    alert("Error Loading Tiles: " + error);
  });
}

function saveTiles() {
  window.dbRef.child("files").child(localStorage.name).set(files);
}

function signinFirstTime() {
  var username = document.getElementById("usernameFirst").value;
  var password = document.getElementById("passwordFirst").value;

  firebase.auth().signInWithEmailAndPassword(username + "@timediatied.com", password).catch(function(error) {
    alert("Username or password is incorrect!");
    window.location.reload();
  });

  finishSetup();
}

function signin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(username + "@timediatied.com", password).catch(function(error) {
    alert("Username or password is incorrect!");
  });

  document.getElementById("signin").style.display = "none";
  document.getElementById("accountInfo").style.display = "block";
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.providerData.forEach(function(profile) {
      document.getElementById("signout").style.display = "none";
      localStorage.setItem("name", profile.email.replace("@timediatied.com", ""));
      localStorage.setItem("access", btoa(localStorage.name));
      document.getElementById("signout").style.display = "block";
      var tilesLoad = setInterval(function() {
        document.getElementById("signin").style.display = "none";
        document.getElementById("accountInfo").style.display = "block";
        document.getElementById("user").innerHTML = "Account: " + localStorage.name;
        loadTiles();
        syncBookmarks();
        renderBookmarks();
        renderApps();
      }, 1000);
    });
  }
});

function finishSetup() {
  document.getElementById("signin").style.display = "none";
  document.getElementById("accountInfo").style.display = "";

  document.title = "TiTanium";
  localStorage.setup = true;
  loadData();
  renderBookmarks();
  webframe.src = homepage;

  setupWindow.style.display = "none";
  browserWindow.style.display = "";
}

function addFile(title, upload) {
  files = JSON.parse(localStorage.files);

  if (files == "") {
    files = {};
  }

  title = title.replace(".", " ");
  files[title] = upload;
  saveTiles();
}

function syncBookmarks() {
  var bookmarks = [];

  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (files[Object.keys(files)[i]].includes("?app=10&l=") == true) {
      bookmarks.push({
        name: Object.keys(files)[i],
        content: decodeURI(atob(files[Object.keys(files)[i]].split("?app=10&l=")[1]))
      });
    }
  }

  return bookmarks;
}

function signOut() {
  document.getElementById("user").style.display = "none";
  document.getElementById("signout").style.display = "none";

  localStorage.removeItem("name");
  localStorage.removeItem("access");
  localStorage.removeItem("files");
  firebase.auth().signout().then(function(error) {
    alert("Sign Out Error: " + error);
  });

  window.location.reload();
}

updateTabs();

setInterval(checkOnlineStatus, 100);

// Webview Event Listeners

webframe.addEventListener("did-start-loading", updateUserAgent);
webframe.addEventListener("did-stop-loading", updatePage);
webframe.addEventListener("did-stop-loading", blockAds);
webframe.addEventListener("did-stop-loading", updateUserAgent);
webframe.addEventListener("did-stop-loading", updateHistory);
webframe.addEventListener("page-title-updated", updatePage);
webframe.addEventListener("new-window", function(e) {
  newTab(e.url);
});
