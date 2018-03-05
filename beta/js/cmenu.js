function openCmenu(e) {
  e = e || window.event;
  e.preventDefault();
  document.getElementById("cmenu").style = "display: inline-block";
  document.getElementById("cmenu").style.top = ( e.clientY-10) + "px";
  document.getElementById("cmenu").style.left = e.clientX + "px";
}
function closeCmenu() {
  document.getElementById("cmenu").style = "display: none";
}
window.addEventListener("contextmenu", openCmenu);
window.addEventListener("click", closeCmenu);
