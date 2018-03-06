var normalMenu = document.getElementById("context-menu").innerHTML;
var specialElement = false;
var overCmenu = false;

document.getElementById("context-menu").mouseover = function() {overCmenu = true;};
document.getElementById("context-menu").mouseout = function() {overCmenu = false;};

function openCmenu(e) {
  e = e || window.event;
  e.preventDefault();
  if(!overTile && !specialElement) {
    document.getElementById("context-menu").innerHTML = normalMenu;
  }
  document.getElementById("context-menu").style = "display: inline-block";
  document.getElementById("context-menu").style.top = ( e.clientY-10) + "px";
  document.getElementById("context-menu").style.left = e.clientX + "px";
  //document.getElementById("tiri-mini-box").focus();
}
function closeCmenu() {
  if(!overCmenu) {
    document.getElementById("context-menu").style = "display: none";
  }
}
window.addEventListener("contextmenu", openCmenu);
window.addEventListener("click", closeCmenu);

function initSpecialElement(element) {
  element.mouseover = function() {specialElement = true;};
  element.mouseout = function() {specialElement = false;};
}
