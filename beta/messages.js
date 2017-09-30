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

var conversations = 0;

if (!localStorage.contacts == undefined) {
  var contacts_split = localStorage.contacts.split(",");
  
    document.getElementById('no-conversations').remove();
    
  for (var i = 0; i < contacts_split.length; i++) {
    document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + contacts_split[i] + '</a></li>';
    document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '<div id="chat' + conversations + '" class="tab-pane fade in"><h3>' + contacts_split[i] + '</h3><div id="div-chat-' + conversations + '">You have not sent any messages to this user.</div><br><input type="text" id="input-chat-' + conversations + '" class="form-control" placeholder="Send a message..."><br><button onclick="sendMessage(&quot;' + conversations_split[i] + '&quot;, document.getElementById(&quot;input-chat-' + conversations + '&quot;).value)" class="btn btn-primary">Send Message</button></div>';
    
    conversations++;
  }
} else {
  localStorage.conversations = "";
}
