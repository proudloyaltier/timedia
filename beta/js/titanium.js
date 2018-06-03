if (!navigator.userAgent.toLowerCase().includes("titanium") && localStorage.dismissedTiTanium !== "true") {
  alertify.delay(20000).log("It appears that you are not using TiTanium. Switch today for a faster, more private browser!", function(ev) {
    ev.preventDefault();
    window.location.href = "https://proudloyaltier.github.io/titanium";
    localStorage.dismissedTiTanium = true;
 })
}
