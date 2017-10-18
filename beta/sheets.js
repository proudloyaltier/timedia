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
	window.location.href = "?t=" + btoa(document.getElementById('tisheets-table').innerHTML);
}
