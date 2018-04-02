var sortAlphabets = function(text) {
  return text.split('').sort().join('');
};

function joinChat() {
  var chat = document.getElementById('chat').value + localStorage.name;
  var chat = chat.toLowerCase();
  var chatPassword1 = sortAlphabets(chat);
  var chatPassword = MD5(chatPassword1);
  window.location.href = "index.html?app=" + chatPassword;
}

if (window.location !== "index.html" && getQueryVariable("app") !== false && getQueryVariable("app").length > 7) {
  setInterval(changeName, 50);
  document.title = "TiChat - TiMedia"
}
