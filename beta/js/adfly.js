/*

adfly.js
v1.0.0

Copyright (C) 2019 The TiMedia Team. All rights reserved.

*/

// Variables

var websiteLinks = document.getElementsByTagName("a");

// Loops

for (var i = 0; i < websiteLinks.length; i++) {
  websiteLinks[i].href = "http://adf.ly/16956779/banner/" + websiteLinks[i].href;
}
