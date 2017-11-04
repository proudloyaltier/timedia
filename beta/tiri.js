if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'what is your favorite website': function() {
     responsiveVoice.speak("T I media dot T-K");
    },
    'what is your favorite food': function() {
     responsiveVoice.speak("I am a computer software. I can not eat.");
    },
    'sing me a song': function() {
     responsiveVoice.speak("la la la la lele leeeeeeeee da, da, da, dididididi lalalalalalalalalllaalla. Sorry. Computers were not meant to sing.");
    },
    'hey': function() {
     responsiveVoice.speak("Hey" + "," + localStorage.name);
    },
    'hay': function() {
     responsiveVoice.speak("Hey" + "," + localStorage.name);
    },
    'hi': function() {
     responsiveVoice.speak("Hi" + "," + localStorage.name);
    },
    'hello': function() {
     responsiveVoice.speak("Hello" + "," + localStorage.name);
    },
    'what is up?': function() {
     responsiveVoice.speak("What is up" + "," + localStorage.name);
    },
    'show me a TI 84 plus': function() {
      window.location.href = "https://upload.wikimedia.org/wikipedia/commons/1/16/TI-84.jpg";
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
    'open the chat *password': openChat,
    'search wikipedia *search': searchWikipedia,
    'search youtube *search': searchYoutube,
    'go to *url': goTo,
    'comment *text': commentText
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
