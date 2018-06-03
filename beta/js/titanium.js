var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if (!navigator.userAgent.toLowerCase().includes("titanium") && localStorage.dismissedTiTanium !== "true" && !isMobile.any()) {
var titaniumad = document.createElement('div')
titaniumad.onclick = function() {
  window.open('https://proudloyaltier.github.io/titanium');
}
titaniumad.style = "top: 0; width: 100%; background-color: black; border-radius: 2px; color: white; text-align: center; height: 30px;";
titaniumad.id = 'titanium-ad'
titaniumad.innerText = "It appears that you are not using TiTanium. Switch today for a faster, more private browser!";
document.body.insertBefore(titaniumad, document.body.firstChild)
setTimeout(function() {
  document.getElementById('titanium-ad').remove();
  localStorage.dismissedTiTanium = true;
 }, 10000);
} 
