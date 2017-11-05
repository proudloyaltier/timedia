localStorage.ts = 'welcome';
localStorage.us = '';

if(window.location == 'https://proudloyaltier.github.io/timedia/beta/tiri.html') {
   setInterval(function() {document.getElementById("tiri").innerHTML = localStorage.ts; document.getElementById("user").innerHTML = localStorage.us;}, 0);
 }

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  //I made some purposeful spelling, or grammar errors to get the pronunciation right
  var commands = {
    //semi-useless easter eggs
    'what is your favorite color': function() {
     responsiveVoice.speak("I do not have eyes but my favorite three number sequence is 26, 159, 162, which is turquoise in javascript");
      localStorage.us = 'What is your favorite color?';
      localStorage.ts = 'Turqouise';
    },
    'what is your favorite number': function() {
     responsiveVoice.speak("forty two");
     localStorage.ts = '42';
    },
    'what is the lonliest number': function() {
     responsiveVoice.speak("one");
      localStorage.ts = '1';
    },
    'sing me a song': function() {
     responsiveVoice.speak("la la la la lele leeeeeeeee da, da, da, dididididi lalalalalalalalalllaalla. Sorry. Computers were not meant to sing.");
      localStorage.ts = 'la la la';
    },
    'tell me a story': function() {
     responsiveVoice.speak("Once upon a time you stopped asking me stupid questions. The End");
      localStorage.ts = 'Once upon a time you stopped asking stupid questions';
    },
    'hey': function() {
     responsiveVoice.speak("Hey" + "," + localStorage.name);
      localStorage.ts = 'Hey, ' + localStorage.name;
    },
    'hay': function() {
     responsiveVoice.speak("Hey" + "," + localStorage.name);
      localStorage.ts = "Hey" + ", " + localStorage.name;
    },
    'hi': function() {
     responsiveVoice.speak("Hi" + "," + localStorage.name);
      localStorage.ts = "Hi" + ", " + localStorage.name;
    },
    'hello': function() {
     responsiveVoice.speak("Hello" + "," + localStorage.name);
      localStorage.ts = "Hello" + ", " + localStorage.name;
    },
    'what is up?': function() {
     responsiveVoice.speak("What is up" + "," + localStorage.name);
      localStorage.ts = "What is up" + ", " + localStorage.name + "?";
    },
    'show me a TI 84 plus': function() {
      window.location.href = "https://upload.wikimedia.org/wikipedia/commons/1/16/TI-84.jpg";
    },
    'do you like to read': function() {
     responsiveVoice.speak("I did, but then I red all of the existing literature in the universe.");
      localStorage.ts = "I did, but then I red all of the existing literature in the universe.";
    },
    'tell me a knock knock joke': function() {
     responsiveVoice.speak("Knock knock. Interupting virtual assistant, What may I help you with?");
      localStorage.ts = "Knock knock";
    },
    'tell me a joke': function() {
     responsiveVoice.speak("why did teary cross the road? Because I was trapped in your computer! Ha Ha Ha Ha");
      localStorage.ts = "why did teary cross the road?<br/>Because I was trapped in your computer!";
    },
    'kas E O': function() {
     responsiveVoice.speak("Do not say that");
      localStorage.ts = "Do not say that";
    },
    'T I media sucks': function() {
     responsiveVoice.speak("I can hear you!");
      localStorage.ts = "I can hear you!";
    },
    'T I media stinks': function() {
     responsiveVoice.speak("I can hear you!");
      localStorage.ts = "I can hear you!";
    },
    'you are awesome': function() {
     responsiveVoice.speak("Why thank you");
      localStorage.ts = "Why thank you";
    },
    'you are amazing': function() {
     responsiveVoice.speak("You are too");
      localStorage.ts = "You are too";
    },
    'you are wonderful': function() {
     responsiveVoice.speak("I know");
      localStorage.ts = "I know";
    },
    'I have a problem': function() {
     window.location.href = "index.html?app=5";
    },
    'what is your favorite website': function() {
     responsiveVoice.speak("T I media dot T-K");
      localStorage.ts = "TiMedia";
    },
    'what is your favorite food': function() {
     responsiveVoice.speak("I am a computer software. I can not eat.");
      localStorage.ts = "I am a computer software. I can not eat.";
    },
    //end of semi-useless easter eggs
    //Commands
    'what time is it': function() {
     var da = new Date();
     var na = da.getMinutes();
     var db = new Date();
     var nb = db.getHours();
     responsiveVoice.speak("it is" + nb + na);
      localStorage.ts = nb + ":" + na;
    },
    'what is the time': function() {
     var da = new Date();
     var na = da.getMinutes();
     var db = new Date();
     var nb = db.getHours();
     responsiveVoice.speak("it is" + nb + na);
      localStorage.ts = nb + ":" + na;
    },
    'open settings': function() {
      window.location.href = "?app=6";
    },
    'open docs': function() {
      window.location.href = "?app=3";
    },
    'open sheets': function() {
      window.location.href = "?app=4";
    },
    'open tiles': function() {
      window.location.href = "?app=7";
    },
    'go home': function() {
      window.location.href = "index.html";
    },
    'go to home': function() {
      window.location.href = "index.html";
    },
    'open home': function() {
      window.location.href = "index.html";
    },
    'log out': function() {
      window.location.href = "logout.html";
    },
    'open the chat *password': openChat,
    'search wikipedia *search': searchWikipedia,
    'search youtube *search': searchYoutube,
    'go to *url': goTo,
    'comment *text': commentText,
    'solve *problem': solve,
    'what is *problem': solve
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

function openChat(password) {
  window.location.href = "?app=" + password.replace(/\s/g, '');
}

function commentText(text) {
  document.getElementById('hcb_form_content').value = text;
  document.getElementById('hcb_submit').click();
  location.reload();
}

function searchWikipedia(search) {
  window.open("https://en.wikipedia.org/wiki/" + search.replace(/\s/g, ''));
}

function searchYoutube(search) {
  window.open("https://www.youtube.com/results?search_query=" + search.replace(/\s/g, ''));
}

function goTo(url) {
  window.open("https://" + url.replace(/\s/g, ''));
}

function solve(problem) {
  var result = eval(problem).toString();
  if(result == "42") {
    responsiveVoice.speak("The answer is forty two, which is also the answer to life, the universe and everything");
    localStorage.ts = "42";
  } else {
    responsiveVoice.speak(result);
    localStorage.ts = result;
  }
}
