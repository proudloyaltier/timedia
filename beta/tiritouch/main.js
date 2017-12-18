var commands = ["TI!", "What is your favorite color?", "What is your favorite number?", "What is the lonliest number?", "Sing me a song", "Tell me a story", "Do you like to read?", "Tell me a knock knock joke", "Tell me a joke", "You are awesome", "You are amazing", "You are wonderful", "What is your favorite website?", "What is your favorite food?", "What time is it?", "Hello", "Hey", "Hello there", "Set a timer for 5 minutes", "Set a timer for 2 minutes", "Give me a nickname", "What is your name?"];
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
  switch (Number(el.value)[el.value.length - 1]) {
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
}

function execTiri() {
  localStorage.us = suggested[0].toLowerCase().replace("?", "");
  tt();
}
