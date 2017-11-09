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
    
}
