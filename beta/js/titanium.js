if ((!navigator.userAgent.toLowerCase().includes("titanium")) && localStorage.dismissedTiTanium !== "true") {
  alertify.confirm("It appears that you are not using TiTanium. Switch today for a faster, more private browser!", function () {
    window.location.href = "https://proudloyaltier.github.io/titanium";
  }, function() {
    localStorage.dismissedTiTanium = true;
  });
}
