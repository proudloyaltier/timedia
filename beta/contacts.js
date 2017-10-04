Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

function addContact() {
  var users = [];

  for (var i = 0; i < logins.length; i++) {
  	users.push(logins[i].split(",")[0]);
  }
  
  if (users.contains(document.getElementById('ticontacts-user').value)) {
  
     if (localStorage.contacts == undefined || localStorage.contacts == "no-content") {
       localStorage.contacts = document.getElementById('ticontacts-user').value + ":" + document.getElementById('ticontacts-info').value;
      } else {
       localStorage.contacts = localStorage.contacts + "," + document.getElementById('ticontacts-user').value + ":" + document.getElementById('ticontacts-info').value;
      }
  
      storeInDatabase("contacts", localStorage.contacts);
      location.reload();
  } else {
      document.getElementById('ticontacts-error').innerHTML = "User does not exist.";
  }
}

function loadContacts() {
   document.getElementById('progress-parent').style = "display: none;";
   document.getElementById('ticontacts-contacts').innerHTML = '<ul class="list-group">';
   
   for (var i = 0; i < localStorage.contacts.split(",").length; i++) {
      document.getElementById('ticontacts-contacts').innerHTML = document.getElementById('ticontacts-contacts').innerHTML + '<li class="list-group-item"><b>' + localStorage.contacts.split(",")[i].split(":")[0] +  '</b> <span style="color: gray;">' + localStorage.contacts.split(",")[i].split(":")[1] + '</span></li>';
   }
 
  document.getElementById('ticontacts-contacts').innerHTML = document.getElementById('ticontacts-contacts').innerHTML + "</ul>";
}

function refreshContacts() {
  getFromDatabase("contacts");
}

if (localStorage.contacts !== undefined && localStorage.contacts !== "no-content") {
   loadingBar();
   setInterval(loadContacts, 1000);
}

function resetContacts() {
   localStorage.removeItem('contacts');
   storeInDatabase("contacts", "no-content");
   window.location.reload();
}

function fullBar() {
    document.getElementById('progress-bar').style = "width: 100%;";
}

function loadingBar() {
 document.getElementById('ticontacts-contacts').innerHTML = "";
 document.getElementById('progress-parent').style = "";
 document.getElementById('progress-bar').style = "width: 0%;";
 setTimeout(fullBar, 100);
}
