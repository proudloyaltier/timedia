function tiPayButton() {
  var amount = prompt("Amount of TiPoints");
  var code = prompt("Code to Run Once Completed");
  if (amount < 0) {
    alert("Negative numbers are not allowed.");
  } else {
    var code = '<iframe width="150px" height="35px" frameborder="0" src="https://proudloyaltier.github.io/timedia/beta/tipaybutton.html?code=' + btoa(amount + "&" + code + "&" + localStorage.name) + '"</iframe>';
    prompt("Copy and Paste this Code", code);
  }
}
