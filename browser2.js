/*

TiTanium Alpha 6.1
By The TiMedia Team

https://github.com/proudloyaltier/titanium

*/

var version = "Alpha 6.1";
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

function installApp() {
  var fileSelector = document.createElement("input");

  fileSelector.type = "file";
  fileSelector.accept = ".tiapp";

  fileSelector.onchange = function() {
    var file = fileSelector.files[0];
    var filename = file.name.toLowerCase();
    var extension = filename.split(".");

    extension = extension[extension.length - 1];

    if (extension === "tiapp") {
      var reader = new FileReader();

      reader.readAsText(file, "UTF-8");
      reader.onload = function(e) {
        var content = e.target.result;
        tiapps.push(content);
        saveData();
        renderApps();
      }
    } else {
      alert("This file type is not supported.");
    }
  }

  fileSelector.click();
}

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

function launchApp(id) {
  var appwindow = window.open();

  appwindow.document.write(tiapps[id]);
}

function renderApps() {
  installedApps.innerHTML = "";

  if (tiapps.length === 0) {
    installedApps.innerHTML = "You haven't installed any apps.";
  } else {
    for (var i = 0; i < tiapps.length; i++) {
      installedApps.innerHTML += "App " + (i + 1) + ' <a onclick="launchApp(' + i + ')">Launch</a> ';
    }
  }
}

function loadData() {
  tihistory = JSON.parse(localStorage.history);
  tibookmarks = JSON.parse(localStorage.bookmarks);
  tiapps = JSON.parse(localStorage.apps);

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
  tibookmarks.push({
    "name": iframe.getTitle(),
    "url": iframe.getURL(),
    "icon": ""
  });

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

  for (var i = 0; i < tibookmarks.length; i++) {
    bookmarksBar.innerHTML += '<a onclick="openBookmark(' + i + ')" oncontextmenu="deleteBookmark(' + i + ')"><img src="' + tibookmarks[i].icon + '" width="16px" height="16px"> ' + tibookmarks[i].name + '</a> ';
  }
}

function openBookmark(id) {
  iframe.src = tibookmarks[id].url;
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
    tihistory.push(iframe.getURL());
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
      currentTab = id - 1;
    }

    titabs.splice(id, 1);
    titabstitles.splice(id, 1);

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

iframe.addEventListener("did-start-loading", updateUserAgent);
iframe.addEventListener("did-stop-loading", updatePage);
iframe.addEventListener("did-stop-loading", blockAds);
iframe.addEventListener("did-stop-loading", updateUserAgent);
iframe.addEventListener("did-stop-loading", updateHistory);
iframe.addEventListener("page-title-updated", updatePage);
iframe.addEventListener("new-window", function(e) {
  newTab(e.url);
});
