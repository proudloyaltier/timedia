function submitApp() {
  var appName = document.getElementById("newapp-name").value;
  var appSource = document.getElementById("newapp-source").value;
  var appjs = document.getElementById("newapp-source-js").value;
  var appIcon = document.getElementById("newapp-icon").value;
  var data = "<ticon style='display: none;'>" + appIcon + "</ticon>" + appSource + "<script>" + appjs + "</script>";
  var a = document.createElement("a");
  a.href = "data:application/octet-stream;charset=utf-8;base64," + btoa(data);
  a.download = appName + ".tiapp";
  a.click();
}

function updateIcon() {
  document.getElementById("newapp-preview").innerHTML = "Preview: <span class='glyphicon glyphicon-" + document.getElementById("newapp-icon").value + "'></span>";
}

function uploadApp() {
 alertify.confirm("Opening apps download from the internet can be dangerous! Are you sure you want to continue?", function () {
    window.selector = document.createElement("input");
    selector.type = "file";
    selector.setAttribute("onchange", "uploadTIAPP()");
    selector.click(); 
   }, function() {
    return false;
 });
}

function uploadTIAPP() {
  var file = selector.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
  window.open(reader.result);
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}
