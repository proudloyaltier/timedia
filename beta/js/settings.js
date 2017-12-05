
function updateSettings() { 
localStorage.bgImg = document.getElementById('backgroundImg').value; 
localStorage.barColor = document.getElementById('barColor').value; 
location.reload(); 
} 

if (localStorage.bgImg !== undefined) { 
document.getElementById('body').background = localStorage.bgImg; 
} 

if (localStorage.barColor !== undefined) { 
document.getElementById('navbar').style = "background-color: #" + localStorage.barColor + ";"; 
} 

function lastTile() { 
window.location.href = localStorage.recentUrl; 
} 

function sstismile() { 
document.getElementById("tismileSettings").style = "display: block"; 
document.getElementById("personalizationSettings").style = "display: none"; 
document.getElementById("tileSettings").style = "display: none"; 
} 

function sstiles() { 
document.getElementById("tismileSettings").style = "display: none"; 
document.getElementById("personalizationSettings").style = "display: none"; 
document.getElementById("tileSettings").style = "display: block"; 
} 

function sspersonal() { 
document.getElementById("tismileSettings").style = "display: none"; 
document.getElementById("personalizationSettings").style = "display: block"; 
document.getElementById("tileSettings").style = "display: none"; 
}
