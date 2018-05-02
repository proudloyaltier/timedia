var date = new Date();

var year = date.getYear();
var month = date.getMonth() + 1;
var day = date.getDate();

if (month == 5 && day == 9) {
  document.getElementById("tiBar").style["background-image"] = 'url("https://media.giphy.com/media/120ErahsQyf1q8/giphy.gif")';
}
