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

function adjustVoice() {
  document.getElementById('tiri').style = "display: none;";
  document.getElementById('settings').style = "display: none;";
  document.getElementById('adjust-voice').style = "display: block;"
}

if (getQueryVariable("app") == 2) {
  document.getElementById('tiri').style = "display: none;";
  document.getElementById('settings').style = "display: block;";
}
