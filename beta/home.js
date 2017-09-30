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

if (localStorage.access !== undefined) {
  if (getQueryVariable("app") == 1) {
    launchApp("points");
  }

  if (getQueryVariable("app") == 2) {
    launchApp("messages");
  }

  if (getQueryVariable("app") == 3) {
    launchApp("tidocs");
  }
       
  if (getQueryVariable("app") == 4) {
    launchApp("newapp");
  }
} else {
  window.location.href = "login.html";
}
