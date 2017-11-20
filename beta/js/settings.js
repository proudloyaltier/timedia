getFromDatabase("bgImg");
getFromDatabase("barColor");

function updateSettings() {
  localStorage.bgImg = document.getElementById('backgroundImg').value;
  localStorage.barColor = document.getElementById('barColor').value;
  storeInDatabase("bgImg", localStorage.bgImg);
  storeInDatabase("barColor", localStorage.barColor);
  location.reload();
}

if (localStorage.bgImg !== undefined) {
  document.getElementById('body').background = localStorage.bgImg;
}

if (localStorage.barColor !== undefined) {
  document.getElementById('navbar').style = "background-color: #" + localStorage.barColor + ";";
}

function lastTile() {
  window.location.href = localStorage.recentUrl;
}
