function addContact() {
  if (!localStorage.contacts == undefined) {
    localStorage.contacts = document.getElementById('ticontacts-user').value + "," + document.getElementById('ticontacts-info').value; 
  } else {
    localStorage.contacts = localStorage.contacts + ":" + document.getElementById('ticontacts-user').value + "," + document.getElementById('ticontacts-info').value;
  }
}
