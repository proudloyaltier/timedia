if (getQueryVariable("app") == 2) {
  document.getElementById("chat").style = "";
  document.getElementById("joinChatBtn").style = "";
}

function joinChat() {
  window.location.replace = "https://proudloyaltier.github.io/timedia/index.html?app=" + document.getElementById("chat").value;
}
