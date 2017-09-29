function newConversation() {
  var user = prompt("Username");
  
  document.getElementById('tabs').innerHTML = document.getElementById('tabs').innerHTML + '<li><a data-toggle="pill" href="#chat' + conversations + '">' + user + '</a></li>';
  document.getElementById('msgs').innerHTML = document.getElementById('msgs').innerHTML + '    <div id="chat' + conversation + '" class="tab-pane fade in active"><h3>' + user + '</h3><p></p></div>';
}
