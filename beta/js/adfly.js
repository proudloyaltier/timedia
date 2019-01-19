/*

adfly.js
v1.0.0

Copyright (C) 2019 The TiMedia Team. All rights reserved.

*/

var lastAd = localStorage.getItem("lastAd");
var currentTime = Date.now();

if (lastAd !== null) {
  var lastAdTime = parseInt(lastAd);
  var timeDifference = currentTime - lastAdTime;
  
  if (timeDifference >= 10000) {
    localStorage.setItem("lastAd", currentTime.toString());
    
    window.location.replace("http://adf.ly/16956779/banner/https://timedia.app/beta/");
  } else {
    window.location.replace("beta/");
  }
} else {
  localStorage.setItem("lastAd", currentTime.toString());
  
  window.location.replace("http://adf.ly/16956779/banner/https://timedia.app/beta/");
}
