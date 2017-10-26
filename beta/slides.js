function addText() {
  var x = 10;
  window.y = 300;
  var text = prompt("Text");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
  window.y = y + 50;
}
