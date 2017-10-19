if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'open docs': function() {
      window.location.href = "/timedia/beta?app=3";
    },
    'open sheets': function() {
      window.location.href = "/timedia/beta?app=4";
    },
    'open tiles': function() {
      window.location.href = "/timedia/beta?app=7";
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}
