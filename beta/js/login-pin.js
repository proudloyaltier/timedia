function loginWithPin() {
  var splitpin = localStorage.pin.split(":");
  window.pinToCompare = MD5(document.getElementById('pin').value) + "jdksfhjsdhhfjsdfhjhhfhfjehcjenfjdmdncndnvbdmfjskfhenrhshgmnnmnsnfndndnfndnfnengnsnfnshfndnfjsjvjndjd";
  if (window.pinToCompare == splitpin[0]) {
  localStorage.name = splitpin[1]
  localStorage.access = btoa(splitpin[1])
  window.location.href = "index.html";
  }
