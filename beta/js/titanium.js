if (!navigator.userAgent.toLowerCase().includes("titanium") && localStorage.dismissedTiTanium !== "true") {
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
 }, 25000);
} 
