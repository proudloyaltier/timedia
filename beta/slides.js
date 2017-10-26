function addText() {
  var x = 10;
  var y = 30;
  var text = prompt("Text");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
  y = y + 500;
}
