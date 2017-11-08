localStorage.ts = 'welcome';
localStorage.us = '';

if(window.location == 'https://proudloyaltier.github.io/timedia/beta/index.html?app=5') {
   setInterval(function() {document.getElementById("tiri").innerHTML = localStorage.ts; document.getElementById("user").innerHTML = localStorage.us;}, 0);
 }

function tt() {
        
          localStorage.us = prompt("Welcome to Tiri Type");
         
         if(localStorage.us == 'I have a problem') {
            window.location.href = "mailto:timediamail@gmail.com";
         } else if(localStorage.us == 'what is your favorite color?') {
            responsiveVoice.speak("I do not have eyes but my favorite three number sequence is 26, 159, 162, which is turquoise in javascript");
            localStorage.us = 'What is your favorite color?';
            localStorage.ts = 'Turqouise';
         } else if(localStorage.us == 'what is your favorite number?') {
             responsiveVoice.speak("forty two");
             localStorage.ts = '42';
         } else if(localStorage.us == 'what is the lonliest number?') {
            responsiveVoice.speak("one");
            localStorage.ts = '1';
         } else if(localStorage.us == 'sing me a song') {
            responsiveVoice.speak("la la la la lele leeeeeeeee da, da, da, dididididi lalalalalalalalalllaalla. Sorry. Computers were not meant to sing.");
            localStorage.ts = 'la la la';
         } else if(localStorage.us == 'tell me a story') {
            responsiveVoice.speak("Once upon a time you stopped asking me stupid questions. The End");
            localStorage.ts = 'Once upon a time you stopped asking stupid questions';
         } else if(localStorage.us == 'hey') {
            responsiveVoice.speak("Hey" + "," + localStorage.name);
            localStorage.ts = 'Hey, ' + localStorage.name;
         } else if(localStorage.us == 'hi') {
            responsiveVoice.speak("Hi" + "," + localStorage.name);
            localStorage.ts = "Hi" + ", " + localStorage.name;
         } else if(localStorage.us == 'hello') {
            responsiveVoice.speak("Hello" + "," + localStorage.name);
            localStorage.ts = "Hello" + ", " + localStorage.name;
         } else if(localStorage.us == 'hey tiri') {
            responsiveVoice.speak("Hey" + "," + localStorage.name);
            localStorage.ts = 'Hey, ' + localStorage.name;
         } else if(localStorage.us == 'hi tiri') {
            responsiveVoice.speak("Hi" + "," + localStorage.name);
            localStorage.ts = "Hi" + ", " + localStorage.name;
         } else if(localStorage.us == 'hello tiri') {
            responsiveVoice.speak("Hello" + "," + localStorage.name);
            localStorage.ts = "Hello" + ", " + localStorage.name;
         } else if(localStorage.us == 'what is up?') {
            responsiveVoice.speak("What is up" + "," + localStorage.name);
            localStorage.ts = "What is up" + ", " + localStorage.name + "?";
         } else if(localStorage.us == 'what is up tiri?') {
            responsiveVoice.speak("What is up" + "," + localStorage.name);
            localStorage.ts = "What is up" + ", " + localStorage.name + "?";
         } else if(localStorage.us == 'show me a TI 84 plus') {
            window.location.href = "https://upload.wikimedia.org/wikipedia/commons/1/16/TI-84.jpg";
         } else if(localStorage.us == 'do you like to read?') {
            responsiveVoice.speak("I did, but then I red all of the existing literature in the universe.");
            localStorage.ts = "I did, but then I red all of the existing literature in the universe.";
         } else if(localStorage.us == 'tell me a knock knock joke') {
            responsiveVoice.speak("Knock knock. Interupting virtual assistant, What may I help you with?");
            localStorage.ts = "Knock knock";
         } else if(localStorage.us == 'tell me a joke') {
            responsiveVoice.speak("why did teary cross the road? Because I was trapped in your computer! Ha Ha Ha Ha");
            localStorage.ts = "why did teary cross the road?<br/>Because I was trapped in your computer!";
         } else if(localStorage.us == 'casio') {
            responsiveVoice.speak("Do not say that");
            localStorage.ts = "Do not say that";
         } else if(localStorage.us == 'timedia sucks') {
            responsiveVoice.speak("I can hear you!");
            localStorage.ts = "I can hear you!";
         } else if(localStorage.us == 'timedia stinks') {
            responsiveVoice.speak("I can hear you!");
            localStorage.ts = "I can hear you!";
         } else if(localStorage.us == 'you are awesome') {
            responsiveVoice.speak("Why thank you");
            localStorage.ts = "Why thank you";
         } else if(localStorage.us == 'you are amazing') {
            responsiveVoice.speak("You are too");
            localStorage.ts = "You are too";
         } else if(localStorage.us == 'you are wonderful') {
            responsiveVoice.speak("I know");
            localStorage.ts = "I know";
         } else if(localStorage.us == 'what is your favorite website?') {
            window.location.href = "index.html";
         } else if(localStorage.us == 'what is your favorite food?') {
            responsiveVoice.speak("I am a computer software. I can not eat.");
            localStorage.ts = "I am a computer software. I can not eat."
         } else if(localStorage.us == 'what time is it?') {
            var da = new Date();
            var na = da.getMinutes();
            var db = new Date();
            var nb = db.getHours();
            responsiveVoice.speak("it is" + nb + na);
            localStorage.ts = nb + ":" + na;
         } else if(localStorage.us == 'what is the time?') {
            var da = new Date();
            var na = da.getMinutes();
            var db = new Date();
            var nb = db.getHours();
            responsiveVoice.speak("it is" + nb + na);
            localStorage.ts = nb + ":" + na;
         } else if(localStorage.us == 'how are you?') {
            responsiveVoice.speak("I am good");
            localStorage.ts = 'I am good';
         } else if(localStorage.us == 'give me a nickname') {
            var rand1 = Math.floor((Math.random() * 10) + 1);
            var rand2 = Math.floor((Math.random() * 10) + 1);
            var rand3 = Math.floor((Math.random() * 10) + 1);
            if(rand1 == 1) {
               rand1 = 'splurty';
            } else if (rand1 == 2) {
               rand1 = 'blobbish';
            } else if (rand1 == 3) {
               rand1 = 'blue';
            } else if (rand1 == 4) {
               rand1 = 'craboodly';
            } else if (rand1 == 5) {
               rand1 = 'creepish';
            } else if (rand1 == 6) {
               rand1 = 'crazy';
            }  else if (rand1 == 7) {
               rand1 = 'floopy';
            } else if (rand1 == 8) {
               rand1 = 'clabblish';
            } else if (rand1 == 9) {
               rand1 = 'snarky';
            } else if (rand1 == 0) {
               rand1 = 'blibber';
            } else {
               rand1 = '';
            }

             if(rand2 == 1) {
               rand2 = 'cow';
            } else if (rand2 == 2) {
               rand2 = 'monkey';
            } else if (rand2 == 3) {
               rand2 = 'fish';
            } else if (rand2 == 4) {
               rand2 = 'mantis';
            } else if (rand2 == 5) {
               rand2 = 'beetle';
            } else if (rand2 == 6) {
               rand2 = 'hymenopus';
            } else if (rand2 == 7) {
               rand2 = 'T I er';
            } else if (rand2 == 8) {
               rand2 = 'babboon';
            } else if (rand2 == 9) {
               rand2 = 'lobster';
            } else if (rand2 == 0) {
               rand2 = 'cat';
            } else {
              rand2 = ''; 
            }

            if(rand3 == 1 || rand3 == 2) {
               rand3 = 'face';
            } else if(rand3 == 3 || rand3 == 4) {
               rand3 = 'guy';
            } else if(rand3 == 5 || rand3 == 6) {
               rand3 = 'nose';
            } else if(rand3 == 7 || rand3 == 8) {
               rand3 = 'person';
            } else {
               rand3 = localStorage.name;
            }

            var nickname = rand1 + ' ' + rand2 + ' ' + rand3;

             responsiveVoice.speak("I will call you " + nickname);
             localStorage.ts = nickname;
         } else if(localStorage.us == 'open settings') {
            window.location.href = "index.html?app=6";
         }  else if(localStorage.us == 'open tiri home') {
            window.location.href = "index.html?app=5";
         } else if(localStorage.us == 'open docs') {
            window.location.href = "index.html?app=3";
         } else if(localStorage.us == 'open sheets') {
            window.location.href = "index.html?app=4";
         } else if(localStorage.us == 'open tiles') {
            window.location.href = "index.html?app=7";
         } else if(localStorage.us == 'open home') {
            window.location.href = "index.html";
         } else if(localStorage.us == 'go home') {
            window.location.href = "index.html";
         } else if(localStorage.us == 'go to home') {
            window.location.href = "index.html";
         } else if(localStorage.us == 'open points') {
            window.location.href = "index.html?app=1";
         } else if(localStorage.us == '') {
            
         } else if(localStorage.us == '') {
            
         } else {
            responsiveVoice.speak("Sorry. I do not understand");
            localStorage.ts = "sorry<br/>I do not understand";
         }
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  //I made some purposeful spelling, or grammar errors to get the pronunciation right
  var commands = {
    //semi-useless easter eggs
    'what is your favorite color': function() {
     responsiveVoice.speak("I do not have eyes but my favorite three number sequence is 26, 159, 162, which is turquoise in javascript");
      localStorage.ts = 'Turqouise';
    },
    'give me a nickname': function() {
      var rand1 = Math.floor((Math.random() * 10) + 1);
      var rand2 = Math.floor((Math.random() * 10) + 1);
      var rand3 = Math.floor((Math.random() * 10) + 1);
      if(rand1 == 1) {
         rand1 = 'splurty';
      } else if (rand1 == 2) {
         rand1 = 'blobbish';
      } else if (rand1 == 3) {
         rand1 = 'blue';
      } else if (rand1 == 4) {
         rand1 = 'craboodly';
      } else if (rand1 == 5) {
         rand1 = 'creepish';
      } else if (rand1 == 6) {
         rand1 = 'crazy';
      }  else if (rand1 == 7) {
         rand1 = 'floopy';
      } else if (rand1 == 8) {
         rand1 = 'clabblish';
      } else if (rand1 == 9) {
         rand1 = 'snarky';
      } else if (rand1 == 0) {
         rand1 = 'blibber';
      }
      
       if(rand2 == 1) {
         rand2 = 'cow';
      } else if (rand2 == 2) {
         rand2 = 'monkey';
      } else if (rand2 == 3) {
         rand2 = 'fish';
      } else if (rand2 == 4) {
         rand2 = 'mantis';
      } else if (rand2 == 5) {
         rand2 = 'beetle';
      } else if (rand2 == 6) {
         rand2 = 'hymenopus';
      } else if (rand2 == 7) {
         rand2 = 'T I er';
      } else if (rand2 == 8) {
         rand2 = 'babboon';
      } else if (rand2 == 9) {
         rand2 = 'lobster';
      } else if (rand2 == 0) {
         rand2 = 'cat';
      }
       
      if(rand3 == 1 || rand3 == 2) {
         rand3 = 'face';
      } else if(rand3 == 3 || rand3 == 4) {
         rand3 = 'guy';
      } else if(rand3 == 5 || rand3 == 6) {
         rand3 = 'nose';
      } else if(rand3 == 7 || rand3 == 8) {
         rand3 = 'person';
      } else {
         rand3 = localStorage.name;
      }
       
      var nickname = rand1 + ' ' + rand2 + ' ' + rand3;
       
       responsiveVoice.speak("I will call you " + nickname);
       localStorage.ts = nickname;
     },
     'how are you': function() {
      responsiveVoice.speak("I am good");
      localStorage.ts = 'I am good';
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
     window.location.href = "mailto:timediamail@gmail.com";
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
    'open terry home': function() {
     window.location.href = "index.html?app=5";
    },
    'log out': function() {
      window.location.href = "logout.html";
    },
    'open points': function() {
      window.location.href = "?app=1";
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
