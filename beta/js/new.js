function submitApp() {
  var appName = document.getElementById("newapp-name").value;
  var appSource = document.getElementById("newapp-source").value;
  var appIcon = document.getElementById("newapp-icon").value;
  var data = btoa("app_name:" + appName + ",created_by:" + localStorage.getItem("name") + ",icon:" + appIcon + ",source:" + appSource);
  var a = document.createElement("a");
  a.href = "data:application/octet-stream;charset=utf-8;base64," + data;
  a.download = appName + ".tiapp";
  a.click();
}

function updateIcon() {
  document.getElementById("newapp-preview").innerHTML = "Preview: <span class='glyphicon glyphicon-" + document.getElementById("newapp-icon").value + "'></span>";
}
