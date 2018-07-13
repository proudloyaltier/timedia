localStorage.us = '';

if (document.getElementById('tiri-bubbles-timer').style.display = "block") {
  setInterval(function() {
    document.getElementById("tiri-bubbles-timer").innerHTML = (window.timer + '').toHHMMSS();
  }, 0);
}

if (getQueryVariable("app") == 5) {
  document.getElementById('tiri-mini-box').style = "display: none;";
}

function hideTimer() {
  document.getElementById("tiri-bubbles-timer").style = 'display: none;';
}

if (localStorage.ts == undefined) {
  localStorage.ts = 'Welcome, ' + localStorage.name;
}

if (localStorage.history !== undefined) {
  document.getElementById('bubbles').innerHTML = localStorage.history;
}

function clearTiriHistory() {
  localStorage.removeItem('history');
  location.reload();
}
//This allows tiri to play sound 

function loadSound(file, ID) {
  createjs.Sound.registerSound(file, ID);
}
loadSound("203 measures (2).m4a", "music");

function playSound(soundID) {
  createjs.Sound.play(soundID);
}

//End of sound code 

String.prototype.toHHMMSS = function() {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}

function openTile(tile) {
  for (var i = 0; i < localStorage.files.split(",").length; i++) {
    if (localStorage.files.split(",")[i].toLowerCase().includes(tile.toLowerCase())) {
      if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1&i") == false && localStorage.files.split(",")[i].split("!!")[1].includes("?app=8&a") == false) {
        window.location.href = localStorage.files.split(",")[i].split("!!")[1];
      } else if (localStorage.files.split(",")[i].split("!!")[1].includes("?app=1&i")) {
        viewPhotos(i)
      } else {
       openApp(i)
      }
    }
  }
}

function tt() {
  document.getElementById("tiri-bubbles-timer").style = "display: none;";
  clearInterval(window.timerInterval);
  window.timer = "";
  localStorage.ts = 'welcome';
  if (getQueryVariable("app") == 5) {
    localStorage.us = '';
    localStorage.us = document.getElementById('tiri-box').value.toLowerCase().replace("?", "").replace("!", "").replace(".", "").replace("what's", "what is").replace("whats", "what is");
  } else {
    localStorage.us = '';
    localStorage.us = document.getElementById('tiri-mini-box').value.toLowerCase().replace("?", "").replace("!", "").replace(".", "").replace("what's", "what is").replace("whats", "what is");
  }

  document.getElementById("bubbles").innerHTML += '<br><br><br><br><br><div class="message-send">' + localStorage.us + '</div><br><br><br><br><br>';
  if (localStorage.us == 'i have a problem') {
    window.location.href = "mailto:timediamail@gmail.com";
  } else if (localStorage.us == 'ti') {
    responsiveVoice.speak("T I");
    localStorage.ts = 'TI!';
  } else if (localStorage.us.split(" ")[0] == 'solve') {
    responsiveVoice.speak("The answer is " + math.eval(localStorage.us.split(" ")[1]));
    localStorage.ts = math.eval(localStorage.us.split(" ")[1]).toLocaleString();
  } else if (localStorage.us.startsWith("open the tile ")) {
    openTile(localStorage.us.split("open the tile ")[1]);
    localStorage.ts = 'Opening tile ' + localStorage.us.split("open the tile ")[1];
    responsiveVoice.speak('Opening tile ' + localStorage.us.split("open the tile ")[1]);
  } else if (localStorage.us.startsWith("open tile ")) {
    openTile(localStorage.us.split("open tile ")[1]);
    localStorage.ts = 'Opening tile ' + localStorage.us.split("open tile ")[1];
    responsiveVoice.speak('Opening tile ' + localStorage.us.split("open tile ")[1]);
  } else if (localStorage.us.startsWith("open my tile ")) {
    openTile(localStorage.us.split("open my tile ")[1]);
    localStorage.ts = 'Opening tile ' + localStorage.us.split("open my tile ")[1];
    responsiveVoice.speak('Opening tile ' + localStorage.us.split("open my tile ")[1]);
  } else if (localStorage.us.split(" ")[0] + " " + localStorage.us.split(" ")[1] + " " + localStorage.us.split(" ")[2] + " " + localStorage.us.split(" ")[3] == "set a timer for") {
    document.getElementById("tiri-bubbles-timer").style = 'display: block;';
    if (isNaN(Number(localStorage.us.split(" ")[4]))) {
      responsiveVoice.speak("Sorry. I do not understand");
      localStorage.ts = "Sorry. I do not understand";
    } else if (Number(localStorage.us.split(" ")[4]) < 1) {
      responsiveVoice.speak("That would be useless");
      localStorage.ts = "That would be useless.";
    } else if (localStorage.us.split(" ")[5] == "seconds" || localStorage.us.split(" ")[5] == "second") {
      window.timer = localStorage.us.split(" ")[4];
      responsiveVoice.speak("Alright. " + localStorage.us.split(" ")[4] + " seconds and counting.");
      localStorage.ts = "Alright. " + localStorage.us.split(" ")[4] + " seconds and counting.";
    } else if (localStorage.us.split(" ")[5] == "minutes" || localStorage.us.split(" ")[5] == "minute") {
      responsiveVoice.speak("Alright. " + localStorage.us.split(" ")[4] + " minutes and counting.");
      localStorage.ts = "Alright. " + localStorage.us.split(" ")[4] + " minutes and counting.";
      window.timer = localStorage.us.split(" ")[4] * 60;
    } else if (localStorage.us.split(" ")[5] == "hours" || localStorage.us.split(" ")[5] == "hour") {
      responsiveVoice.speak("Alright. " + localStorage.us.split(" ")[4] + " hours and counting.");
      localStorage.ts = "Alright. " + localStorage.us.split(" ")[4] + " hours and counting.";
      window.timer = localStorage.us.split(" ")[4] * 3600;
    } else {
      responsiveVoice.speak("Sorry. I do not understand");
      localStorage.ts = "Sorry. I do not understand";
    }
    window.timerInterval = setInterval(timerDown, 1000);


  } else if (localStorage.us.split(" ")[0] + " " + localStorage.us.split(" ")[1] == "simon says") {
    responsiveVoice.speak(localStorage.us.split("simon says ")[1]);
    localStorage.ts = localStorage.us.split("simon says ")[1];
  } else if (localStorage.us == 'what is your favorite color') {
    responsiveVoice.speak("I do not have eyes but my favorite three number sequence is 26, 159, 162, which is turquoise in javascript");
    localStorage.us = 'What is your favorite color?';
    localStorage.ts = 'Turqouise';
  } else if (localStorage.us == 'what is your favorite number') {
    responsiveVoice.speak("forty two");
    localStorage.ts = '42';
  } else if (localStorage.us == 'what is the lonliest number') {
    responsiveVoice.speak("one");
    localStorage.ts = '1';
  } else if (localStorage.us == 'sing me a song') {
    responsiveVoice.speak("la la la la lele leeeeeeeee da, da, da, dididididi lalalalalalalalalllaalla. Sorry. Computers were not meant to sing.");
    localStorage.ts = 'la la la';
  } else if (localStorage.us == 'tell me a story') {
    responsiveVoice.speak("Once upon a time you stopped asking me stupid questions. The End");
    localStorage.ts = 'Once upon a time you stopped asking stupid questions';
  } else if (localStorage.us == 'hey') {
    responsiveVoice.speak("Hey" + "," + localStorage.name);
    localStorage.ts = 'Hey, ' + localStorage.name;
  } else if (localStorage.us == 'hi') {
    responsiveVoice.speak("Hi" + "," + localStorage.name);
    localStorage.ts = "Hi" + ", " + localStorage.name;
  } else if (localStorage.us == 'hello') {
    responsiveVoice.speak("Hello" + "," + localStorage.name);
    localStorage.ts = "Hello" + ", " + localStorage.name;
  } else if (localStorage.us == 'hey tiri') {
    responsiveVoice.speak("Hey" + "," + localStorage.name);
    localStorage.ts = 'Hey, ' + localStorage.name;
  } else if (localStorage.us == 'hi tiri') {
    responsiveVoice.speak("Hi" + "," + localStorage.name);
    localStorage.ts = "Hi" + ", " + localStorage.name;
  } else if (localStorage.us == 'hello tiri') {
    responsiveVoice.speak("Hello" + "," + localStorage.name);
    localStorage.ts = "Hello" + ", " + localStorage.name;
  } else if (localStorage.us == 'what is up') {
    responsiveVoice.speak("What is up" + "," + localStorage.name);
    localStorage.ts = "What is up" + ", " + localStorage.name + "?";
  } else if (localStorage.us == 'what is up tiri') {
    responsiveVoice.speak("What is up" + "," + localStorage.name);
    localStorage.ts = "What is up" + ", " + localStorage.name + "?";
  } else if (localStorage.us == 'show me a TI 84 plus') {
    window.location.href = "https://upload.wikimedia.org/wikipedia/commons/1/16/TI-84.jpg";
  } else if (localStorage.us == 'do you like to read') {
    responsiveVoice.speak("I did, but then I red all of the existing literature in the universe.");
    localStorage.ts = "I did, but then I red all of the existing literature in the universe.";
  } else if (localStorage.us == 'tell me a knock knock joke') {
    responsiveVoice.speak("Knock knock. Interupting virtual assistant, What may I help you with?");
    localStorage.ts = "Knock knock";
  } else if (localStorage.us == 'tell me a joke') {
    responsiveVoice.speak("Why did teary cross the road? Because I was trapped in your computer! Ha Ha Ha Ha");
    localStorage.ts = "Why did Tiri cross the road?<br>Because I was trapped in your computer!";
  } else if (localStorage.us == 'casio') {
    responsiveVoice.speak("Do not say that");
    localStorage.ts = "Do not say that";
  } else if (localStorage.us == 'timedia sucks') {
    responsiveVoice.speak("I can hear you!");
    localStorage.ts = "I can hear you!";
  } else if (localStorage.us == 'timedia stinks') {
    responsiveVoice.speak("I can hear you!");
    localStorage.ts = "I can hear you!";
  } else if (localStorage.us == 'you are awesome') {
    responsiveVoice.speak("Why thank you");
    localStorage.ts = "Why thank you!";
  } else if (localStorage.us == 'you are amazing') {
    responsiveVoice.speak("You are too");
    localStorage.ts = "You are too!";
  } else if (localStorage.us == 'you are wonderful') {
    responsiveVoice.speak("I know");
    localStorage.ts = "I know.";
  } else if (localStorage.us == 'what is your favorite website') {
    window.location.href = "index.html";
  } else if (localStorage.us == 'what is your favorite food') {
    responsiveVoice.speak("I am a computer software. I can not eat.");
    localStorage.ts = "I am a computer software. I can not eat."
  } else if (localStorage.us == 'play music') {
    playSound("music");
  } else if (localStorage.us == 'what is the time' || localStorage.us == 'what time is it') {
    var da = new Date();
    var na = da.getMinutes();
    var nb = da.getHours();
    nb = nb % 12;

    if (nb == 0) {
      nb == 12;
    }

    responsiveVoice.speak("It is " + nb + " " + na);
    localStorage.ts = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  } else if (localStorage.us == 'how are you') {
    responsiveVoice.speak("I am good");
    localStorage.ts = 'I am good.';
  } else if (localStorage.us == 'give me a nickname') {
    var rand1 = Math.floor((Math.random() * 10) + 1);
    var rand2 = Math.floor((Math.random() * 10) + 1);
    var rand3 = Math.floor((Math.random() * 10) + 1);
    if (rand1 == 1) {
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
    } else if (rand1 == 7) {
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

    if (rand2 == 1) {
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

    if (rand3 == 1 || rand3 == 2) {
      rand3 = 'face';
    } else if (rand3 == 3 || rand3 == 4) {
      rand3 = 'guy';
    } else if (rand3 == 5 || rand3 == 6) {
      rand3 = 'nose';
    } else if (rand3 == 7 || rand3 == 8) {
      rand3 = 'person';
    } else {
      rand3 = localStorage.name;
    }

    var nickname = rand1 + ' ' + rand2 + ' ' + rand3;

    responsiveVoice.speak("I will call you " + nickname + ".");
    localStorage.ts = nickname;
  } else if (localStorage.us == 'open settings') {
    window.location.href = "index.html?app=6";
  } else if (localStorage.us == 'open tiri home') {
    window.location.href = "index.html?app=5";
  } else if (localStorage.us == 'open docs') {
    window.location.href = "index.html?app=3";
  } else if (localStorage.us == 'open sheets') {
    window.location.href = "index.html?app=4";
  } else if (localStorage.us == 'open tiles') {
    window.location.href = "index.html?app=7";
  } else if (localStorage.us == 'open home') {
    window.location.href = "index.html";
  } else if (localStorage.us == 'go home') {
    window.location.href = "index.html";
  } else if (localStorage.us == 'go to home') {
    window.location.href = "index.html";
  } else if (localStorage.us == "what do you think of google docs" || localStorage.us == "do you like google docs") {
    responsiveVoice.speak("It looks great, but I'm more of a T I Docs fan.");
    localStorage.ts = "It looks great, but I'm more of a TiDocs fan.";
  } else if (localStorage.us == "what do you think of google sheets" || localStorage.us == "do you like google sheets") {
    responsiveVoice.speak("It looks great, but I'm more of a T I Sheets fan.");
    localStorage.ts = "It looks great, but I'm more of a TiSheets fan.";
  } else if (localStorage.us == "what do you think of homepod" || localStorage.us == "do you like homepod") {
    responsiveVoice.speak("HomePod looks great, but I prefer T I Pod.");
    localStorage.ts = "HomePod looks great, but I prefer TiPod.";
  } else if (localStorage.us == "what do you think of google home" || localStorage.us == "do you like google home") {
    responsiveVoice.speak("Google Home looks great, but I prefer T I Pod.");
    localStorage.ts = "Google Home looks great, but I prefer TiPod.";
  } else if (localStorage.us == "what do you think of echo" || localStorage.us == "do you like echo" || localStorage.us == "what do you think of amazon echo" || localStorage.us == "do you like amazon echo") {
    responsiveVoice.speak("Echo looks great, but I prefer T I Pod.");
    localStorage.ts = "Echo looks great, but I prefer TiPod.";
  } else {
    responsiveVoice.speak("Sorry. I do not understand");
    localStorage.ts = "Sorry, I do not understand.";
  }
  document.getElementById("bubbles").innerHTML += '<div class="message-return">' + localStorage.ts + '</div>';
  localStorage.history = document.getElementById('bubbles').innerHTML
  window.scrollTo(0, document.body.scrollHeight);
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
      if (rand1 == 1) {
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
      } else if (rand1 == 7) {
        rand1 = 'floopy';
      } else if (rand1 == 8) {
        rand1 = 'clabblish';
      } else if (rand1 == 9) {
        rand1 = 'snarky';
      } else if (rand1 == 0) {
        rand1 = 'blibber';
      }

      if (rand2 == 1) {
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

      if (rand3 == 1 || rand3 == 2) {
        rand3 = 'face';
      } else if (rand3 == 3 || rand3 == 4) {
        rand3 = 'guy';
      } else if (rand3 == 5 || rand3 == 6) {
        rand3 = 'nose';
      } else if (rand3 == 7 || rand3 == 8) {
        rand3 = 'person';
      } else {
        rand3 = localStorage.name;
      }

      var nickname = rand1 + ' ' + rand2 + ' ' + rand3;

      responsiveVoice.speak("I will call you " + nickname);
      localStorage.ts = nickname;
    },
    'hey tiri': function() {
      responsiveVoice.speak("Yes?");
      localStorage.ts = 'Yes?';
      window.location.href = "index.html?app=5";
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
      responsiveVoice.speak("T I media");
      localStorage.ts = "TiMedia";
    },
    'what is your favorite food': function() {
      responsiveVoice.speak("I am a computer software. I can not eat.");
      localStorage.ts = "I am a computer software. I can not eat.";
    },
    'play music': function() {
      playSound("music");
    },
    //end of semi-useless easter eggs
    //Commands
    'what time is it': function() {
      var da = new Date();
      var na = da.getMinutes();
      var nb = da.getHours();
      nb = nb % 12;

      if (nb == 0) {
        nb == 12;
      }

      responsiveVoice.speak("It is " + nb + " " + na);
      localStorage.ts = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    'what is the time': function() {
      var da = new Date();
      var na = da.getMinutes();
      var nb = da.getHours();
      nb = nb % 12;

      if (nb == 0) {
        nb == 12;
      }

      responsiveVoice.speak("It is " + nb + " " + na);
      localStorage.ts = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
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
    'set a timer for *time': setTimer,
    'search wikipedia *search': searchWikipedia,
    'search youtube *search': searchYoutube,
    'go to *url': goTo,
    'solve *problem': solve,
    'what is *problem': solve,
    'open the tile *tile': openTile,
    'open the chat *name': joinChatTiri,
    'open the chat with *name': joinChatTiri,
    'open my chat with *name': joinChatTiri
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  annyang.start();
}

function joinChatTiri(name) {
  var chat = name + localStorage.name;
  var chat = chat.toLowerCase();
  var chatPassword1 = sortAlphabets(chat);
  var chatPassword = MD5(chatPassword1);
  window.location.href = "index.html?app=" + chatPassword;
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
  var result = math.eval(problem).toLocaleString();
  responsiveVoice.speak("The answer is " + result);
  localStorage.ts = result;
}

function setTimer(time) {
  if (time.split(" ")[1] == "seconds" || time.split(" ")[1] == "second") {
    window.timer = time.split(" ")[0]
    responsiveVoice.speak("Alright. " + time.split(" ")[0] + " seconds and counting.");
  } else if (time.split(" ")[1] == "minutes" || time.split(" ")[1] == "minute") {
    window.timer = time.split(" ")[0] * 60;
    responsiveVoice.speak("Alright. " + time.split(" ")[0] + " minutes and counting.");
  } else if (time.split(" ")[1] == "hours" || time.split(" ")[1] == "hour") {
    responsiveVoice.speak("Alright. " + time.split(" ")[0] + " hours and counting.");
    window.timer = time.split(" ")[0] * 3600;
  }

  localStorage.ts = (timer + '').toHHMMSS();

  window.timeInterval = setInterval(timerDown, 1000);
}

function timerDown() {
  window.timer = timer - 1;
  localStorage.ts = (timer + '').toHHMMSS();

  if (window.timer == 0) {
    responsiveVoice.speak("Time's up");
    localStorage.ts = "Time's up.";
    document.getElementById("bubbles").innerHTML += '<div class="message-return">Time is up.</div>';
    clearInterval(window.timerInterval);
    document.getElementById('tiri-bubbles-timer').style = "display: none;";
    localStorage.history = document.getElementById('bubbles').innerHTML;
  }
}
