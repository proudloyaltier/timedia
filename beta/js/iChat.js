//adds some iChat plugins

var me = new iChatPlugin("action/me", function (data) {
  if (data.txt.startsWith("/me ")) {
    data.txt = "*" + data.u + " " + data.txt.substring(4);
    data.u = false;
  }
  return data;
}, "Written by jcgter777, using code from _iPhoenix_.");

var pm = new iChatPlugin("action/pm", function (data) {
  if (data.txt.startsWith("/pm ")) {
    var recipient = data.txt.match(/(\S+)/g)[1];
    if (data.u === firebase.auth().currentUser.displayName) {
      data.u = "[ You => " + recipient + "]";
      data.txt = data.txt.substring(4 + recipient.length);
    } else {
      if (firebase.auth().currentUser.displayName === recipient) {
        data.u = "[ " + data.un + " => You ]";
        data.txt.substring(4 + recipient.length);
      } else {
        data.txt = "";
      }
    }
  }
  return data;
}, "Written by _iPhoenix_");

iChat.onload = function () {
  iChat.registerPlugins(me, pm);
}
