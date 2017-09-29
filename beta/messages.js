getFromDatabase("conversations");
var conversations = 0;

if (!localStorage.conversations == undefined || localStorage.conversations == "") {
  var conversations_split = localStorage.conversations.split(",");
  
    document.getElementById('no-conversations').remove();
    
  for (var i = 0; i < conversations_split.length; i++) {
    document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + conversations_split[i] + '</a></li>';
    document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '    <div id="chat' + conversations + '" class="tab-pane fade in active"><h3>' + conversations_split[i] + '</h3><p></p></div>';
    
    conversations++;
  }
} else {
  localStorage.conversations = "";
}

function newConversation() {
  conversations++;
  
  var user = prompt("Username");
  
  if (user == localStorage.name) {
      alert("You can't make a conversation with yourself.");
  } else {
    
  if (localStorage.conversations.includes(user)) {
      alert("You've already started a conversation with this person.");
  } else {
  
  document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + user + '</a></li>';
  document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '    <div id="chat' + conversations + '" class="tab-pane fade in active"><h3>' + user + '</h3><p></p></div>';

  if (localStorage.conversations !== "") {
    localStorage.conversations = localStorage.conversations + "," + user;
    storeInDatabase("conversations", localStorage.conversations + "," + user);
  } else {
    localStorage.conversations = user;
    storeInDatabase("conversations", user);
  }
  }
  }
}
