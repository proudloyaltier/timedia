if (getQueryVariable("app") == 2) {
  document.getElementById("chat").style = "";
  document.getElementById("joinChatBtn").style = "";
}

function joinChat() {
  window.location.href = "index.html?app=" + document.getElementById("chat").value;
}
