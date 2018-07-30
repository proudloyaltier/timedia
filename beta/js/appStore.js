var storeApps = []
function getAppsFromStore() {
    window.dbRef.child("appStore").once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            var icon = child.val().split("<ticon style='display: none;'>")[1].replace("</ticon>" + child.val().split("</ticon>")[1], "");
            storeApps.push({
                icon: icon,
                content: child.val(),
                name: child.key
            })
        })
    })
}

function loadApps() {
    document.getElementById('store-allapps').innerHTML = "";
    for (var i = 0; i < storeApps.length; i++) {
        document.getElementById('store-allapps').innerHTML = document.getElementById('store-allapps').innerHTML + '<li style="float: left; width: 250px; height: 250px;" class="card" onclick="openStoreApp(' + i + ');"><h3><center>' + storeApps[i].name + '<br><span style="font-size: 300%; color: #2296F3;" class="glyphicon glyphicon-' + storeApps[i].icon + '"><br></span><br><br></center></h3></span></li>';
    }
}

function uploadAppToSubmit() {
    window.dbRef.child("appStore").child(document.getElementById("submitted-app-name").value).once("value", function (snapshot) {
        if (snapshot.val() == null) {
            window.selector = document.createElement("input");
            selector.type = "file";
            selector.accept = ".tiapp";
            selector.setAttribute("onchange", "uploadSubmittedApp()");
            selector.click();
        } else {
            swal("Error", "App name is already taken", "error");
        }
    })
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
    var file = selector.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        window.dbRef.child("appStore").child(document.getElementById("submitted-app-name").value).set(reader.result)
        swal("Submitted", "Your app has successfully been submitted", "success")
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

setTimeout(function () {
    getAppsFromStore();
    setInterval(loadApps, 1000);
}, 1000)