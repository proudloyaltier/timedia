function tiPayButton() {
  var amount = prompt("Amount of TiPoints");
  var code = '<iframe src="https://proudloyaltier.github.io/timedia/beta/tipaybutton.html?code=' + btoa(amount + "&creator=" + localStorage.name) + '</iframe>';
  
  prompt("Copy and Paste this Code", code);
}
