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
	var url = "index.html?app=4" + "&t=" + btoa(document.getElementById('tisheets-table').innerHTML);
	localStorage.workToSave = url;
	localStorage.recentUrl = url;
	localStorage.workToSaveTitle = document.getElementById('sheetsTitle').value;
	window.location.href = "?app=7";
}


if (getQueryVariable("t") !== false || localStorage.editSheet !== undefined) {
	if (getQueryVariable("t") == false) {
		document.getElementById('sheetsTitle').style = "display: none;";
		document.getElementById('tisheets-table').innerHTML = localStorage.editSheet;
		localStorage.removeItem("editSheet");
	} else {
		document.getElementById('tisheets-table').innerHTML = atob(getQueryVariable("t"));	
		document.getElementById('tisheets-table').setAttribute("contenteditable", false);
		
		document.getElementById('tisheets-save').style = "display: none;";
		document.getElementById('tisheets-add-row').style = "display: none;";
		document.getElementById('tisheets-edit').style = "";
		document.getElementById('sheetsTitle').style = "";
	}
}

function editSheet() {
	localStorage.editSheet = atob(getQueryVariable("t"));
	window.location.href = "index.html?app=4";
}
