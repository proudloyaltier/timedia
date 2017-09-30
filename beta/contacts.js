function addContact() {
  if (!localStorage.contacts == undefined) {
    localStorage.contacts = document.getElementById('ticontacts-user').value + "," + document.getElementById('ticontacts-info').value; 
  } else {
    localStorage.contacts = localStorage.contacts + ":" + document.getElementById('ticontacts-user').value + "," + document.getElementById('ticontacts-info').value;
  }
}

function loadContacts() {
 document.getElementById('ticontacts-contacts').innerHTML = '<ul class="list-group">';
  
 for (var i = 0; i < localStorage.contacts.split(",").length; i++) {
    document.getElementById('ticontacts-contacts').innerHTML = document.getElementById('ticontacts-contacts').innerHTML + '<li class="list-group-item">' + localStorage.contacts.split(",")[i].split(":")[0] +  '<span style="color: gray;">' + localStorage.contacts.split(",")[i].split(":")[1] + '</span></li>';
 }
 
 document.getElementById('ticontacts-contacts').innerHTML = document.getElementById('ticontacts-contacts').innerHTML + "</ul>";
}

if (!localStorage.contacts == undefined) {
  setInterval(loadContacts, 1000);
}
setInterval(loadContacts, 1000);
