var isWindows = navigator.platform.toLowerCase().includes("win");
var isMac = navigator.platform.toLowerCase().includes("mac");
var isLinux = navigator.platform.toLowerCase().includes("linux");

var downloadButton = document.getElementById("downloadButton");
var availableDownloads = document.getElementById("availableDownloads");

var windowsDownload = "https://drive.google.com/open?id=1QLwQkhBCht5K6l0MUnTHtmjTbfZJJZGh";
var macDownload = "https://drive.google.com/open?id=1QLwQkhBCht5K6l0MUnTHtmjTbfZJJZGh";
var linuxDownload = "https://drive.google.com/open?id=1QLwQkhBCht5K6l0MUnTHtmjTbfZJJZGh";

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
