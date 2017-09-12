  // a unique random key generator
  function getUniqueId () {
    return 'private-' + Math.random().toString(36).substr(2, 9);
  }
  // function to get a query param's value
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
      
             var id = getUrlParameter('id');
  if (!id) {
    location.search = location.search
      ? '&id=' + getUniqueId() : 'id=' + getUniqueId();
    return;
  }
         
    </script>
      <script src="https://js.pusher.com/4.0/pusher.min.js"></script>
    <script>
      var pusher = new Pusher(<titext>);
                              
                              // subscribe to the changes via Pusher
var channel = pusher.subscribe(id);
channel.bind('some-fun-event', function(data) {
  // do something meaningful with the data here
});
      
      channel.bind('client-text-edit', function(html) {
  doc.innerHTML = html;
});
      
function triggerChange (e) {
  channel.trigger('client-text-edit', e.target.innerHTML);
}
doc.addEventListener('input', triggerChange);
  
