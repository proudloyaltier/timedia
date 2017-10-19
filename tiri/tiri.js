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

if (localStorage.command == undefined) {
       localStorage.command = "hey Siri";
}

function adjustVoice() {
  document.getElementById('tiri').style = "display: none;";
  document.getElementById('settings').style = "display: none;";
  document.getElementById('adjust-voice').style = "display: block;";
       
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
              recognition.lang = 'en-US';
              recognition.interimResults = false;
              recognition.maxAlternatives = 5;
              recognition.start();

       recognition.onresult = function(event) {
           localStorage.command = event.results[0][0].transcript;
           window.location.href = "index.html";
       };
}

if (getQueryVariable("app") == 2) {
  document.getElementById('tiri').style = "display: none;";
  document.getElementById('settings').style = "display: block;";
}

  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
              recognition.lang = 'en-US';
              recognition.interimResults = false;
              recognition.maxAlternatives = 5;
              recognition.start();

       recognition.onresult = function(event) {
           if (event.results[0][0].transcript.split(localStorage.command)[0] == localStorage.command) { // if user says Hey Tiri
              var filtered = event.results[0][0].transcript.split(localStorage.command)[1];
              var parsed = filtered.split(" ");
                  
              if (parsed[0] + " " + parsed[1] == "open docs") {
                  window.location.href = "/timedia/beta?app=3";
              }
           }
       };
