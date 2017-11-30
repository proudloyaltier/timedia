if (getQueryVariable("app") == 2) {
  document.getElementById("chat").style = "";
  document.getElementById("joinChatBtn").style = "";

}

function joinChat() {
var chat = [document.getElementById('chat').value, localStorage.name];
chat.sort();
var chatPassword = MD5(chat);
window.location.href = "index.html?app=" + chatPassword;

}

function showChatPassword() {
  document.getElementById('show-chat-password-label-btn').style = "display: none;";
  document.getElementById('chat-password-label-text').style = "display: block;";
  document.getElementById('chat-password-label-text').innerHTML = "Chat Password:  " + getQueryVariable("app");
}

if (window.location !== "index.html" && document.title == "Home - TiMedia" && getQueryVariable("app") !== false) {
  setInterval(changeName, 50);
} else {
}
