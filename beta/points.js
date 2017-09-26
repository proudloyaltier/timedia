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
