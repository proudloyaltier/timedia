
function saveBookmark() {
  var url = "index.html?app=10"+ '&l=' + btoa(encodeURI(document.getElementById('bookmarksContent').innerHTML));
  localStorage.recentUrl = url;
  localStorage.workToSave = url;
  localStorage.workToSaveTitle = document.getElementById('tibookmarksTitle').value;
  window.location.href = "?app=7";
}

if (getQueryVariable("l") !== false || localStorage.editBookmark !== undefined) {
  if (localStorage.editBookmark !== undefined) {
    document.getElementById('bookmarksContent').innerHTML = decodeURI(localStorage.editBookmark);
    localStorage.removeItem('editBookmark');
    throw new Error("Opened edit.");
  }
  
  document.getElementById('createBookmark').remove();
  document.getElementById('viewBookmark').style = "visibility: block;";
  document.getElementById('viewBookmark').innerHTML = decodeURI(atob(getQueryVariable("l")));
  document.getElementById('tibookmarks-edit').style = "visibility: block;";
  document.getElementById('tibookmarks-open').style = "visibility: block;";
}

function editBookmark() {
  localStorage.editBookmark = atob(getQueryVariable("l"));
  window.location.href = "index.html?app=10";
}

function openBookmark() {
  window.location.href = decodeURI(atob(getQueryVariable("l")));
}
