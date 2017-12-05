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
var chatPassword1 = sortAlphabets(chat);
var chatPassword = MD5(chatPassword1);
window.location.href = "index.html?app=" + chatPassword;
document.title = "TiChat - TiMedia"
}

if (window.location !== "index.html" && getQueryVariable("app") !== false) {
  setInterval(changeName, 50);
} else {
}
