function saveDoc() {
  var url = window.location.href + '&p=' + btoa(document.getElementsByTagName('blockquote')[0].innerHTML);

  document.getElementById("url").innerHTML = 'Document URL: ' + url;
}

if (getQueryVariable("p") !== false) {
  document.getElementById('create').remove();
  document.getElementById('view').style = "visibility: block;";
  document.getElementById('view').innerHTML = atob(getQueryVariable("p"));
}
