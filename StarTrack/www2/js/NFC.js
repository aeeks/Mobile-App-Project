document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device Ready");
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
}
function onPause() {
    // Handle the pause event
}

function onResume() {
    // Handle the resume event
}

function onMenuKeyDown() {
    // Handle the menubutton event
}

//

//Check if enabled: 
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

//Need 2 phones with this app demo deployed for this NFC check: 

function nfcMessage() { 
    nfc.addNdefListener(callback, [onSuccess], [onFailure]);
}
