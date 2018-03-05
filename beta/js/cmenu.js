var normalMenu = document.getElementById("context-menu")innerHTML;

function openCmenu(e) {
  e = e || window.event;
  e.preventDefault();
  if(!overTile) {
    document.getElementById("context-menu").innerHTML = normalMenu;
  }
  document.getElementById("context-menu").style = "display: inline-block";
  document.getElementById("context-menu").style.top = ( e.clientY-10) + "px";
  document.getElementById("context-menu").style.left = e.clientX + "px";
}
function closeCmenu() {
  document.getElementById("context-menu").style = "display: none";
}
window.addEventListener("contextmenu", openCmenu);
window.addEventListener("click", closeCmenu);
