function copy(text) {
  var copyFunction = document.oncopy;
  var div = document.createElement("div");
  var range = document.createRange();

  document.oncopy = null;

  div.innerHTML = text;
  document.body.appendChild(div);
  range.selectNode(div);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");
  document.body.removeChild(div);

  document.oncopy = copyFunction;
}

document.oncopy = function() {
  var clipboard = window.getSelection().toString();
  var prefix = '<a style="text-decoration: none;" href="' + window.location.href + '">';
  var suffix = '</a> | <span style="color: gray;">Copied with TiCopy, the new way to copy things.</span>';

  copy(prefix + clipboard + suffix);
}
