function getMessages() {
   var urlRef = window.dbRef.child(getQueryVariable("app"));
   urlRef.on("value", function (snapshot) {
    snapshot.forEach(function (child) {
      var currentHTML = document.getElementById('private-messages').innerHTML
      document.getElementById('private-messages').innerHTML = ('<p>' + CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8) + '</p><br>' + currentHTML);
    });
  });
}

function sendMessage(message) {
  window.dbRef.child(getQueryVariable("app")).push(CryptoJS.AES.encrypt("<b>" + localStorage.name + "</b>" + " said:" + "<br>" + message, localStorage.password) + "");
  document.getElementById('private-messages').innerHTML = ' ';
  getMessages();
}

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
  document.getElementById('iChat-input').remove();
  document.getElementById('iChat-messages').remove();
  document.title = "TiChat - TiMedia"
  window.addEventListener('DOMContentLoaded', function () {
  getMessages();
  }, false);
}
