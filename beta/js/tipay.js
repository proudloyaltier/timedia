function tiPayButton() {
  var amount = prompt("Amount of TiPoints");
  if (amount < 0) {
    alert("Negative numbers not allowed.");
  } else {
    var code = '<iframe src="https://proudloyaltier.github.io/timedia/beta/tipaybutton.html?code=' + btoa(amount + "&creator=" + localStorage.name) + '"</iframe>';
    prompt("Copy and Paste this Code", code);
  }
}
