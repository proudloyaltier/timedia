function addText() {
  var y = 10;
  var text = prompt("Text");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.strokeText(text,y,50);
  y = y + 10;
}
