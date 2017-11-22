if (getQueryVariable("app") == 2) {
  document.getElementById("chat").style = "";
  document.getElementById("joinChatBtn").style = "";
}

function joinChat() {
  var url = "index.html?app=" + document.getElementById("chat").value;
  localStorage.workToSave = url;
  window.location.href = "index.html?app=7";
}
