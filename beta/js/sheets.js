function newRow() {
  document.getElementById('tisheets-table').innerHTML = document.getElementById('tisheets-table').innerHTML + '<tr id="tisheets-cell"' + document.getElementsByTagName("tr").length + '><td>Name</td><td>Value</td><td>Value</td></tr>';
}

function newColumn() {
  for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
	    row = document.getElementById("tisheets-cell" + i);
	    cell = row.insertCell(0);
	    cell.innerHTML = "Name";
	}
}

function saveSheet() {
	if (localStorage.tisheetssave == undefined) {
  	var tisheetssave = Math.floor(Math.random() * 1000000000);
  	storeInDatabase(tisheetssave, document.getElementById('tisheets-table').innerHTML)
	} else {
         window.dbRef.child(localStorage.tisheetssave).child(localStorage.owner).set(document.getElementById('tisheets-table').innerHTML); 
         var tisheetssave = localStorage.tisheetssave
	}
	var url = "index.html?app=4" + "&t=" + tisheetssave;
	if (localStorage.tisheetssave == undefined) {
	localStorage.workToSave = url;
	localStorage.recentUrl = url;
	localStorage.workToSaveTitle = document.getElementById('sheetsTitle').value;
	} else {
	localStorage.removeItem('tisheetssave')
	}
	window.location.href = "?app=7";
}


if (getQueryVariable("t") !== false || localStorage.editSheet !== undefined) {
	if (localStorage.editSheet !== undefined) {
		document.getElementById('sheetsTitle').remove();
	}
	if (getQueryVariable("t") == false) {
		document.getElementById('tisheets-table').innerHTML = localStorage.editSheet;
		localStorage.removeItem("editSheet");
	} else {
	        document.getElementById('sheetsTitle').style = "display: none;";
		document.getElementById('sheets-formatting-bar').style = "display: none;";
		  var urlRef = window.dbRef.child(getQueryVariable("t"));
  		urlRef.on("value", function(snapshot) {
  		snapshot.forEach(function(child) {
		localStorage.owner = child.key;
    		document.getElementById('tisheets-table').innerHTML = child.val();
   		 window.edit = document.getElementById('tisheets-table').innerHTML
    		});
  		});
		document.getElementById('tisheets-table').setAttribute("contenteditable", false);
		document.getElementById('tisheets-save').style = "display: none;";
		document.getElementById('tisheets-add-row').style = "display: none;";
		document.getElementById('tisheets-edit').style = "";
		document.getElementById('tisheets-reader').style = "";
	}
}

function editSheet() {
	localStorage.editSheet = window.edit
	window.location.href = "index.html?app=4";
	document.getElementById('sheetsTitle').style = "";
	localStorage.tisheetssave = getQueryVariable("t")
}

function sheetReader() {
  document.getElementById('timedia-nav-bar').remove();
  document.getElementById('tisheets-edit').remove();
  document.getElementById('tisheets-reader').remove();
  document.getElementById('tisheets-header').remove();
}
