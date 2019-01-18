/*

adfly.js
v1.0.0

Copyright (C) 2019 The TiMedia Team. All rights reserved.

*/

if (window.self === window.top) {
  var websiteLinks = document.getElementsByTagName("a");

  for (var i = 0; i < websiteLinks.length; i++) {
    websiteLinks[i].href = "http://adf.ly/16956779/banner/" + websiteLinks[i].href;
  }
}
