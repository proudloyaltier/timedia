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

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'open tidocs': function() {
      window.location.href = "?app=3";
      result("1 app opened.");
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
