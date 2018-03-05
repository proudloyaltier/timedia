var normalMenu = document.getElementById("cmenu")innerHTML;

function openCmenu(e) {
  e = e || window.event;
  e.preventDefault();
  if(!overTile) {
    document.getElementById("cmenu").innerHTML = normalMenu;
  }
  document.getElementById("cmenu").style = "display: inline-block";
  document.getElementById("cmenu").style.top = ( e.clientY-10) + "px";
  document.getElementById("cmenu").style.left = e.clientX + "px";
}
function closeCmenu() {
  document.getElementById("cmenu").style = "display: none";
}
window.addEventListener("contextmenu", openCmenu);
window.addEventListener("click", closeCmenu);
