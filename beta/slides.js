function addText() {
  var text = prompt("Text");
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.strokeText(text,10,50);
}
