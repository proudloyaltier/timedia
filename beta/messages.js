Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

getFromDatabase("conversations");
var conversations = 0;

if (!localStorage.conversations == undefined || !localStorage.conversations == "") {
  var conversations_split = localStorage.conversations.split(",");
  
    document.getElementById('no-conversations').remove();
    
  for (var i = 0; i < conversations_split.length; i++) {
    document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + conversations_split[i] + '</a></li>';
    document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '    <div id="chat' + conversations + '" class="tab-pane fade in"><h3>' + conversations_split[i] + '</h3><p></p></div>';
    
    conversations++;
  }
} else {
  localStorage.conversations = "";
}

function newConversation() {
  if (localStorage.conversations == undefined) {
    localStorage.conversations = "";
  }
  
  conversations++;
  
  var user = prompt("Username");
  
  var users = [];

  for (var i = 0; i < logins.length; i++) {
  	users.push(logins[i].split(",")[0]);
  }
  
  if (!users.includes(user)) {
    alert("User does not exist.");
  } else {
  
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
    location.reload();
  }
  }
  }
}

function removeConversation() {
  var user_to_remove = prompt("Username");
  
  if (localStorage.conversations.includes(user_to_remove)) {
    var conversations_array = localStorage.conversations.split(",");
    
    conversations_array.remove(user_to_remove);
    
    localStorage.conversations = conversations_array;
      
    location.reload();
  } else {
    alert("You have not started a conversation with this user.");
  }
}
