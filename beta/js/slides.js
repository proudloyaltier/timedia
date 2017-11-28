var c = document.getElementById("tislides-canvas");
var ctx = c.getContext("2d");

var x = 10;
window.y = 300;

function addText() {
  var text = prompt("Text");
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
  window.y = y + 50;
}

ctx.getImageData(0, 0, 1000, 600);

function saveSlide() {
  var url = "index.html?app=9"+ "&s=" + btoa(JSON.stringify(ctx.getImageData(0, 0, 1000, 600)));
  localStorage.workToSave = url;
  window.location.href = "?app=7";
}

if (getQueryVariable("s") !== false) {
  ctx.putImageData(JSON.parse(getQueryVariable("s")));
  document.getElementById("tislides-save").remove();
}
