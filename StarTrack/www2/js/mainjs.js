document.addEventListener("deviceready", onDeviceReady, false);
 var a; 
 var b;
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

function switcher(id) {  //standard page switcher
    a = document.getElementsById(id)
    a.style.display = 'none';

    b = document.getElementById('login'); //turn visibility on for this div
    b.style.display = 'block';
}

function Xswitcher() { //special switcher, for showing the navbar as well as the pages after 
    a = document.getElementById("login");
    a.style.display = 'none';

    b = document.getElementById('feed'); 
    b.style.display = 'block';

    c = document.getElementById('navMain'); 
    c.style.display = 'block';
}