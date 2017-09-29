getFromDatabase("conversations");
var conversations = 3;

function newConversation() {
  var user = prompt("Username");
  
  if (user == localStorage.name) {
      alert("You can't make a conversation with yourself.");
  } else {
    
  if (localStorage.includes(user)) {
      alert("You've already started a conversation with this person.");
  } else {
  
  document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + user + '</a></li>';
  document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '    <div id="chat' + conversation + '" class="tab-pane fade in active"><h3>' + user + '</h3><p></p></div>';

  if (localStorage.conversations !== undefined) {
    storeInDatabase("conversations", localStorage.conversations + "," + user);
  }
  }
  }
}
