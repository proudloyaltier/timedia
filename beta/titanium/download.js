var isWindows = navigator.platform.toLowerCase().includes("win");
var isMac = navigator.platform.toLowerCase().includes("mac");
var isLinux = navigator.platform.toLowerCase().includes("linux");

var downloadButton = document.getElementById("downloadButton");
var availableDownloads = document.getElementById("availableDownloads");

var windowsDownload = "https://github.com/proudloyaltier/timedia/archive/TiTanium.zip";
var macDownload = "https://github.com/proudloyaltier/timedia/archive/TiTanium.zip";
var linuxDownload = "https://github.com/proudloyaltier/timedia/archive/TiTanium.zip";

if (isWindows) {
  downloadButton.innerText = "Download for Windows";
} else if (isMac) {
  downloadButton.innerText = "Download for Mac";
} else if (isLinux) {
  downloadButton.innerText = "Download for Linux";
} else {
  downloadButton.style.display = "none";
  availableDownloads.style.display = "";
}

function download() {  
  if (isWindows) {
    window.location.replace(windowsDownload);
  } else if (isMac) {
    window.location.replace(macDownload);
  } else if (isLinux) {
    window.location.replace(linuxDownload);
  } else {
    alert("TiTanium is not yet supported on your device.");
  }
}
