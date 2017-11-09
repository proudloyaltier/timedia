function dismissTiBank() {
    localStorage.tibankmd = "true";
    document.getElementById('ti-bank-msg').remove();
}

if (localStorage.tibankmd == "true") {
  document.getElementById('ti-bank-msg').remove();
}

if (localStorage.points !== undefined) {
  document.getElementById('points-balance').innerHTML = localStorage.points + " TiPoints";
}

function refreshPoints() {
    getFromDatabase("points");
    localStorage.points = Number(localStorage.points);
    
    document.getElementById('points-balance').innerHTML = localStorage.points + " TiPoints";
}

if (getQueryVariable("app") == 1) {
    setInterval(refreshPoints, 1000);
    setInterval(checkPointChanges, 1000);
}


function checkPointChanges() {
localStorage.newpoints = localStorage.points;
getFromDatabase("points");
    
    if (localStorage.newpoints !== localStorage.points) {
        storeInDatabase("points", localStorage.points);
    }

}
