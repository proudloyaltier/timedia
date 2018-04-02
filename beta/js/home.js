var mutedusers = [""];

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function changeName() {
       if (firebase.auth().currentUser.displayName != localStorage.getItem('name')) {
              firebase.auth().currentUser.updateProfile({displayName: localStorage.getItem('name')});
       }
}
  
Element.prototype.remove = function() {
       this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

document.getElementById('userdrop').innerHTML = localStorage.name;

function launchApp(appname) {
  document.getElementById('home').remove();

  document.getElementById(appname).style = "visibility: block;"
}

if (localStorage.access == btoa(localStorage.name)) {
  if (getQueryVariable("app") == 2) {
    launchApp("messages");
    document.title = "TiChat - TiMedia";
  }

  if (getQueryVariable("app") == 3) {
    launchApp("tidocs");
    document.title = "TiDocs - TiMedia";
  }
       
  if (getQueryVariable("app") == 4) {
    launchApp("tisheets");
    document.title = "TiSheets - TiMedia";
  }
       
  if (getQueryVariable("app") == 5) {
    launchApp("tiritype");
    document.title = "Tiri Type - TiMedia";
  }
       
  if (getQueryVariable("app") == 6) {
    launchApp("settings");
    document.title = "Settings - TiMedia";
  }
       
  if (getQueryVariable("app") == 7) {
    launchApp("tiles");
    document.title = "Tiles - TiMedia";
  }
       
  if (getQueryVariable("app") == 8) {
    launchApp("newapp");
    document.title = "New App - TiMedia";
  }
       
 if (getQueryVariable("app") == 10) {
    launchApp("tibookmarks");
    document.title = "TiBookmarks - TiMedia";
  }    
       
 if (getQueryVariable("app") == 11) {
    launchApp("tismile");
    document.title = "TiSmile - TiMedia";
  }
       
if (getQueryVariable("app") == 9) {
   launchApp("tislides");
   document.title = "TiSlides - TiMedia";
 }
  
} else {
  window.location.href = "login.html";
}

function checkCasioer() {
var comment = document.getElementById('iChat-input').value;
 if (comment.toLowerCase().includes("casio")) {
  alert("Don't say Casio! Your comment has been deleted!");
  comment.value = "";
  window.location.href = "logout.html";
 }
}

if (getQueryVariable("app") == false || getQueryVariable("app") > 12) {
       setInterval(checkCasioer, 0);
       setInterval(changeName, 500);
}

function customImageUpload() {
     $(".hcb-comment-tb").removeClass('hcb-comment-tb');
       $('.inputfile').removeClass('inputfile');
       $( "label[for='hcb_file']" ).text( "Insert Image" ).addClass('btn').addClass('btn-primary');
}
