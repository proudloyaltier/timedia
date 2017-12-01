if (getQueryVariable("app") == 2) {
  document.getElementById("chat").style = "";
  document.getElementById("joinChatBtn").style = "";

}

var sortAlphabets = function(text) {
    return text.split('').sort().join('');
};


function joinChat() {
var chat = document.getElementById('chat').value + localStorage.name;
var chat = chat.toLowerCase();
localStorage.chatTitle = chat + "  Chat";
var chatPassword1 = sortAlphabets(chat);
var chatPassword = MD5(chatPassword1);
window.location.href = "index.html?app=" + chatPassword;

}

if (window.location !== "index.html" && getQueryVariable("app") !== false) {
  document.title = localStorage.chatTitle
  setInterval(changeName, 50);
} else {
  localStorage.removeItem("chatTitle")
}
