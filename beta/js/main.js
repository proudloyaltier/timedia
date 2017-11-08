if (localStorage.access !== undefined) {
  document.getElementById('login').remove();
  document.getElementById('logout').style = "display: block;";
}


function logOut() {
  storeInDatabase("points", localStorage.points)
  window.location.href = "logout.html";
}
