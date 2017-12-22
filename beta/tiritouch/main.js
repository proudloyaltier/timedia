var commands = ["Hello", "Hey", "How are you?", "What time is it?", "Sing me a song", "TI", "Pick a random number", "Give me a nickname", "What is your favorite number?", "What is the lonliest number?", "Tell me a story", "Tell me a knock knock joke", "What is your name?"];
var suggested = [];
var possible = [];
var length;
var element = document.getElementById("possible");

function predict(letters) {
  suggested = [];
  if (possible.length == 0) {
    for (i = 0; i < letters.length; i++) {
      possible[i] = letters.charAt(i);
    }
  } else {
    var length = possible.length;
    for (i = 0; i < length; i++) {
      for (j = 0; j < letters.length; j++) {
        possible.push(possible[i] + letters.charAt(j));
      }
    }
  }

  for (var k = 0; possible[0].length !== possible[possible.length - 1].length; k++) {
    possible.splice(possible[k], 1);
  }

  for (var l = 0; l < commands.length; l++) {
    for (var m = 0; m < possible.length; m++) {
      if (commands[l].toLowerCase().includes(possible[m].toLowerCase())) {
        suggested.push(commands[l]);
      }
    }
  }

  if (!suggested[0]) {
    element.innerHTML = "";
  } else {
    element.innerHTML = suggested[0];
  }
}

function typeNum(el) {
  if (event.keyCode == 13) {
    execTiri();
  } else if (event.keyCode == 8 || event.keyCode == 12) {
    suggested = [];
    possible = [];
    length = 0;
    element.innerHTML = "";
  } else {
    switch (Number(el.value)) {
      case 7:
        predict(" ");
        break;
      case 8:
        predict("ABC");
        break;
      case 9:
        predict("DEF");
        break;
      case 4:
        predict("GHI");
        break;
      case 5:
        predict("JKL");
        break;
      case 6:
        predict("MNO");
        break;
      case 1:
        predict("PQRS");
        break;
      case 2:
        predict("TUV");
        break;
      case 3:
        predict("WXYZ");
    }

    el.value = "";
  }
}

function respond(text) {
  document.getElementById("response").innerHTML = text;
  responsiveVoice.speak(text);
  suggested = [];
  possible = [];
  length = 0;
  element.innerHTML = "";
}

function respondCustom(text, speech) {
  document.getElementById("response").innerHTML = text;
  responsiveVoice.speak(speech);
  suggested = [];
  possible = [];
  length = 0;
  element.innerHTML = "";
}

function execTiri() {
  var input = suggested[0];

  switch (input) {
    case "Hello":
      respond("Hello");
      break;
    case "Hey":
      respond("Hey");
      break;
    case "What is your name?":
      respond("Tiri, pleased to meet you.");
      break;
    case "Set a timer for 5 minutes":
      respond("Alright, 5 minutes and counting.");
      break;
    case "How are you?":
      respond("I'm doing well. What about you?");
      break;
    case "Sing me a song":
      respondCustom("Sorry. Computers were not meant to sing.", "la la la la lele leeeeeeeee da, da, da, dididididi lalalalalalalalalllaalla. Sorry. Computers were not meant to sing.")
      break;
    case "TI":
      respondCustom("TI!", "T I!");
      break;
    case "Pick a random number":
      var random = Math.floor((Math.random() * 100) + 1) + "";
      respond(random);
      break;
    case "What is your favorite number?":
      respond("42");
      break;
    case "What is the lonliest number?":
      respond("1");
      break;
    case "Tell me a story":
      respond("Once upon a time you stopped asking me stupid questions. The End");
      break;
    case "Tell me a knock knock joke":
      respond("Knock knock. Interupting virtual assistant, what may I help you with?");
      break;
    case "What time is it?":
      var da = new Date();
      var na = da.getMinutes();
      var nb = da.getHours();
      nb = nb % 12;

      if (nb == 0) {
        nb == 12;
      }

      respondCustom(new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"), "It is " + nb + " " + na);
      break;
    case "Give me a nickname":
      var rand1 = Math.floor((Math.random() * 10) + 1);
      var rand2 = Math.floor((Math.random() * 10) + 1);
      var rand3 = Math.floor((Math.random() * 10) + 1);

      switch (rand1) {
        case 1:
          rand1 = 'splurty';
          break;
        case 2:
          rand1 = 'blobbish';
          break;
        case 3:
          rand1 = 'blue';
          break;
        case 4:
          rand1 = 'craboodly';
          break;
        case 5:
          rand1 = 'creepish';
          break;
        case 6:
          rand1 = 'crazy';
          break;
        case 7:
          rand1 = 'floopy';
          break;
        case 8:
          rand1 = 'clabblish';
          break;
        case 9:
          rand1 = 'snarky';
          break;
        case 0:
          rand1 = 'blibber';
          break;
        case 10:
          rand1 = '';
      }

      switch (rand2) {
        case 1:
          rand2 = 'cow';
          break;
        case 2:
          rand2 = 'monkey';
          break;
        case 3:
          rand2 = 'fish';
          break;
        case 4:
          rand2 = 'mantis';
          break;
        case 5:
          rand2 = 'beetle';
          break;
        case 6:
          rand2 = 'hymenopus';
          break;
        case 7:
          rand2 = 'T I er';
          break;
        case 8:
          rand2 = 'babboon';
          break;
        case 9:
          rand2 = 'lobster';
          break;
        case 0:
          rand2 = 'cat';
          break;
        case 10:
          rand2 = '';
      }

      switch (rand3) {
        case 1:
          rand3 = 'face';
          break;
        case 2:
          rand3 = 'face';
          break;
        case 3:
          rand3 = 'guy';
          break;
        case 4:
          rand3 = 'guy';
          break;
        case 5:
          rand3 = 'nose';
          break;
        case 6:
          rand3 = 'nose';
          break;
        case 7:
          rand3 = 'person';
          break;
        case 8:
          rand3 = 'person';
          break;
        case 9:
          rand3 = '';
          break;
        case 0:
          rand3 = '';
          break;
        case 10:
          rand3 = '';
      }

      var nickname = rand1 + ' ' + rand2 + ' ' + rand3;

      respond(nickname);
  }

}
