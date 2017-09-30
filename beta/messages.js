var conversations = 0;

if (!localStorage.contacts == undefined) {
  var contacts_split = localStorage.contacts.split(",");
    
  var temp_contacts = [];
  for (var j = 0; j < contacts_split.length; j++) {
     temp_contacts.push(localStorage.contacts.split(",")[j].split(":")[0]);
  }
    
  var contacts_split = temp_contacts;
  var temp_contacts = [];
  
  document.getElementById('no-conversations').remove();
    
  for (var i = 0; i < contacts_split.length; i++) {
    document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + contacts_split[i] + '</a></li>';
    document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '<div id="chat' + conversations + '" class="tab-pane fade in"><h3>' + contacts_split[i] + '</h3><div id="div-chat-' + conversations + '">You have not sent any messages to this user.</div><br><input type="text" id="input-chat-' + conversations + '" class="form-control" placeholder="Send a message..."><br><button onclick="sendMessage(&quot;' + conversations_split[i] + '&quot;, document.getElementById(&quot;input-chat-' + conversations + '&quot;).value)" class="btn btn-primary">Send Message</button></div>';
    
    conversations++;
  }
} else {
  localStorage.conversations = "";
}
