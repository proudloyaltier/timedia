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
  var prefix = '<span style="text-decoration: none;" onclick="window.location.href = ' + window.location.href + ';">';
  var suffix = '</span>';

  copy(prefix + clipboard + suffix);
}
