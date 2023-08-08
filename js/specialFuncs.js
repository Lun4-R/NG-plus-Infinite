function displayPluses(count) {
  if (count <= 0) {
    return '';
  }
  if (count <= 4) {
    return '+'.repeat(count);
  } else {
    return '+(' + count + ')';
  }
}


function showCustomDialog() {
 document.getElementById('customDialog').style.display = 'block';
}

// Close the custom dialog
function closeCustomDialog() {
 document.getElementById('customDialog').style.display = 'none';
}

function changeName() {
 var newName = document.getElementById('nameInput').value.trim();
 var nameLink = document.getElementById('nameLink');

 switch (newName.toLowerCase()) {
  case 'walter white':
   nameLink.innerText = 'the one who knocks...';
   break;
  case 'zittara':
   nameLink.innerText = 'Niko Steiner';
   break;
  case 'matrix':
   nameLink.innerText = '1337';
   break;
  default:
   if (newName !== '') {
    nameLink.innerText = newName;
   } else {
    alert("Input was empty.");
   }
 }

 closeCustomDialog();
}