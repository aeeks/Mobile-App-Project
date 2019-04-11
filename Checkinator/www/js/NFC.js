//Check if enabled: <------- Demo buttons that appear on the NFC page for now, will be removed later on for the real deal 
function checkEnabled() { 
    nfc.enabled(onSuccess, onFailure);
} 

function onSuccess() { 
    alert("NFC Enabled");
}

function onFailure() { 
    alert("NFC Not Enabled");
}

function showSett() { 
    nfc.showSettings();
}

//
//This is called by clicking the Navbar button for NFC reading, this begins listening for NFC tags, upon finding one it stops listening for tags (and wont reactivate until the Navbar button is pressed again)
function NFCRead() { 
    //navigator.nfc.addMimeTypeListener("text/pg", readTag);
    //nfc.addNdefListener(onNdef, failure);
    ACTION_NDEF_DISCOVERED(onNdef, failure);
}

/* function readTag(nfcEvent) { 
    var tag= nfcEvent.tag; 

    alert(JSON.stringify(nfcevent.tag));

    // Change the NFC page here, after reading the tag, to alert of check-in success 
} */

function onNdef(nfcEvent) {
        
    alert(JSON.stringify(nfcEvent.tag));

    var tag = nfcEvent.tag;

    // BB7 has different names, copy to Android names
    if (tag.serialNumber) {
        tag.id = tag.serialNumber;
        tag.isWritable = !tag.isLocked;
        tag.canMakeReadOnly = tag.isLockable;
    }     
}

function failure() { 
    alert("failure");
}