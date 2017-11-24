
function getFromMessagesDatabase(gname) {
  var i = 0;
  while (i < document.getElementsByTagName('blockquote').length) {
    if (document.getElementsByClassName('author-name')[i].innerHTML == "to" + getCookie("name") + " ") {
      return(document.getElementsByTagName('blockquote')[i].innerHTML);
      throw new Error("Got value from database.");
    }
    i++;
	  if (i == 10) {
		  document.getElementsByTagName('img')[document.getElementsByTagName('img').length - 1].click();
	  }
  }
}
function storeInMessagesDatabase(sname, value) {
  document.getElementById("hcb_form_name").value = sname;
  document.getElementById("hcb_form_content").value = value;
  document.getElementById("hcb_submit").click();
}
function refreshMessages() {
	document.getElementById('messages').innerHTML = getFromMessagesDatabase("to" + getCookie("name"));
}
	
function sendMessage(user, message) {
	storeInMessagesDatabase("to" + user, "<p><b>" + getCookie("name") + ": </b>" + message + "</p>" + getFromMessagesDatabase("to" + user));
}
setInterval(refreshMessages, 100);
