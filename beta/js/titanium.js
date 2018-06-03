function openTiTaniumDownload() {
window.open('https://proudloyaltier.github.io/titanium');
}

var titaniumad = document.createElement('div')
titaniumad.onclick = openTiTaniumDownload();
titaniumad.style = "top: 0; width: 100%; background-color: black; border-radius: 2px; color: white; text-align: center; height: 30px;"
titaniumad.innerText = "It appears that you are not using TiTanium. Switch today for a faster, more private browser!";
document.body.insertBefore(titaniumad, document.body.firstChild)
