function refreshMessages() {
	document.getElementById('messages').innerHTML = getFromDatabase("to" +localStorage.name);
}
	
function sendMessage(user, message) {
	storeInDatabase("to" + user, "<p><b>" + localStorage.name + ": </b>" + message + "</p>" + getFromDatabase("to" + user));
}
setInterval(refreshMessages, 100);
