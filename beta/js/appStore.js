var storeApps = []
function getAppsFromStore() {
    window.dbRef.child("appStore").once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            var icon = child.val().content.split("<ticon style='display: none;'>")[1].replace("</ticon>" + child.val().content.split("</ticon>")[1], "");
            storeApps.push({
                icon: icon,
                developer: child.val().developer,
                content: child.val().content,
                name: child.key
            })
        })
    })
}

function updateTiAppMenu(app) {
    document.getElementById("context-menu").innerHTML = '<ul class="context-menu__items"><li><a href="#" onclick="updateAppInStore(' + app + ')"><span class="glyphicon glyphicon-pencil"></span> Update App</a></li></ul>';
}

function loadApps() {
    document.getElementById('store-allapps').innerHTML = "";
    for (var i = 0; i < storeApps.length; i++) {
        if (storeApps[i].developer.toLowerCase() == localStorage.name.toLowerCase()) {
            document.getElementById('store-allapps').innerHTML = document.getElementById('store-allapps').innerHTML + '<li style="float: left; width: 250px; height: 250px;" onmouseover="specialElement = true;" oncontextmenu="updateTiAppMenu(' + i + ')" onmouseout="specialElement = false" class="card" onclick="openStoreApp(' + i + ');"><h3><center>' + storeApps[i].name + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-' + storeApps[i].icon + '"><br></span><br><br></center></h3></span></li>';
        } else {
            document.getElementById('store-allapps').innerHTML = document.getElementById('store-allapps').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onmouseover="specialElement = false" onclick="openStoreApp(' + i + ');"><h3><center>' + storeApps[i].name + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-' + storeApps[i].icon + '"><br></span><br><br></center></h3></span></li>';
        }
    }
}

function updateAppInStore(app) {
    window.selector = document.createElement("input");
    selector.type = "file";
    selector.accept = ".tiapp";
    selector.setAttribute("onchange", "uploadAppToUpdate(" + app + ")");
    selector.click();
}

function uploadAppToUpdate(app) {
    var file = selector.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        window.dbRef.child("appStore").child(storeApps[app].name).child("content").set(reader.result)
        swal("Submitted", "Your app has successfully been updated", "success")
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

function searchApps() {
    if (document.getElementById('apps-search').value == "") {
        document.getElementById('store-search').style.display = 'none';
        document.getElementById('store-allapps').style.display = 'block';
        loadApps();
    } else {
        document.getElementById('store-search').innerHTML = "";
        document.getElementById('store-search').style.display = 'block';
        document.getElementById('store-allapps').style.display = 'none';
        for (var i = 0; i < storeApps.length; i++) {
            if (storeApps[i].name.toLowerCase().includes(document.getElementById('apps-search').value.toLowerCase())) {
                document.getElementById('store-search').innerHTML = document.getElementById('store-search').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="openStoreApp(' + i + ');"><h3><center>' + storeApps[i].name + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-' + storeApps[i].icon + '"><br></span><br><br></center></h3></span></li>';
            }
        }
    }
}

function uploadAppToSubmit() {
    window.selector = document.createElement("input");
    selector.type = "file";
    selector.accept = ".tiapp";
    selector.setAttribute("onchange", "uploadSubmittedApp()");
    selector.click();
}

function openStoreApp(i) {
    var appToOpen = storeApps[i].content
    if (!navigator.userAgent.toLowerCase().includes("titanium")) {
        window.open("data:text/html;charset=utf-8," + appToOpen, "", "_blank")
    } else {
        window.open("installapp://" + appToOpen)
        swal("App Installed", "The app has been installed in TiTanium, open all your apps in the Apps menu(<span class='glyphicon glyphicon-th'></span>)", "success")
    }
}


function uploadSubmittedApp() {
    window.dbRef.child("appStore").once("value", function (snapshot) {
        if (!snapshot.hasChild(document.getElementById("submitted-app-name").value)) {
            var file = selector.files[0];
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                window.dbRef.child("appStore").child(document.getElementById("submitted-app-name").value).child("content").set(reader.result)
                window.dbRef.child("appStore").child(document.getElementById("submitted-app-name").value).child("developer").set(localStorage.name)
                swal("Submitted", "Your app has successfully been submitted", "success")
            }, false);

            if (file) {
                reader.readAsText(file);
            }
        } else {
            swal("Error", "App name is already taken", "error");
        }
    });
}

setTimeout(function () {
    getAppsFromStore();
    setInterval(loadApps, 1000);
}, 1000)

function generateAppBadge() {
    var appBadgeCode = "<a href='https://proudloyaltier.github.io/timedia/beta/index.html?app=13&app-badge=" + document.getElementById("app-badge-name").value + "'><img src='https://proudloyaltier.github.io/timedia/beta/other%20resources/app-badge.png'></img></a>"
    document.getElementById("app-badge-result").style.display = 'block'
    document.getElementById("app-badge-result").innerText = appBadgeCode;
    document.getElementById("app-badge-result-preview").style.display = 'block'
    document.getElementById("app-badge-result-preview").innerHTML = appBadgeCode;
    document.getElementById("app-badge-preview-text").style.display = 'block';
    document.getElementById("app-badge-code-text").style.display = 'block';
}

if (getQueryVariable("app-badge") !== false && getQueryVariable("app") == 13) {
    document.getElementById("apps-search").value = getQueryVariable("app-badge");
    setInterval(searchApps, 1000);
}