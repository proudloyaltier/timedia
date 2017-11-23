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
       
  if (getQueryVariable("app") == 9) {
    launchApp("tislides");
    document.title = "TiSlides - TiMedia";
  }
       
 if (getQueryVariable("app") == 10) {
    launchApp("tibookmarks");
    document.title = "TiBookmarks - TiMedia";
  }    
 
} else {
  window.location.href = "login.html";
}

function checkMute() {
if (mutedusers.includes(localStorage.name.toLowerCase())) {
  document.getElementById('HCB_comment_form_box').remove();
  document.getElementById('mutemessage').innerHTML = "You are muted! You cannot post comments.";
 }
}

function checkCasioer() {
var comment = document.getElementById('hcb_form_content').value;
 if (comment.toLowerCase().includes("casio")) {
  alert("Don't say Casio! Your comment has been deleted!");
  comment.value = "";
  window.location.href = "logout.html";
 }
}

setInterval(checkMute, 0);
setInterval(checkCasioer, 0)
