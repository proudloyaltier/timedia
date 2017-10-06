function joinChat() {
  window.location.href = "https://proudloyaltier.github.io/timedia/index.html?app=" + document.getElementById('chat').value;
}

if (getQueryVariable("app") == 2) {
   document.getElementById("chat").style = "";  
}
