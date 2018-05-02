function submitApp() {
  var appName = document.getElementById("newapp-name").value;
  var appSource = document.getElementById("newapp-source").value;
  var appIcon = document.getElementById("newapp-icon").value;
  var formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdDKfLkPKG5bjNEMv_gDC221zTLDAuF0hUCKbadSLZnpFYVrw/viewform?entry.546288400=";
  var data = btoa("app_name:" + appName + ",created_by:" + localStorage.getItem("name") + ",icon:" + appIcon + ",source:" + appSource);
  window.location.href = formURL + data;
}

function updateIcon() {
  document.getElementById("newapp-preview").innerHTML = "Preview: <span class="glyphicon glyphicon-" + document.getElementById("newapp-icon").value + ""></span>"
}
