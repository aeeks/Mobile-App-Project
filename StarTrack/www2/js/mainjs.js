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

//Non-cordova-specific code goes below: 
//Vars
var userEmail; 
var userPasswd;
var signupEmail;
var signupPasswd;
var signupUserType;
var verifCode;
var checkVerifCode;

//Functions
function contentLoaderDemo() { //Loading content into the events section automatically (could be from internet source)
    document.getElementById("eventContainer").innerHTML = '<div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div>';
    //Load this: <div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div>
}

function getLogin() { 
    userEmail = document.getElementById('userEmail');
    userPasswd = document.getElementById('userPasswd');
    console.log("Entered Email: " + userEmail.value + " Entered Password: " + userPasswd.value);
    loginBtn();
}

function getSignup(){
    signupEmail = document.getElementById('signupEmail');
    signupPasswd = document.getElementById('signupPasswd');
    console.log("Entered Email: " + signupEmail.value + " Entered Password: " + signupPasswd.value + "User Type: " + signupUserType);
    signupBtn();
}

function getVerifCode(){ 
    verifCode = 1234; //this should be set to the value that the user needs to match in order to activate an account (from internet source or maybe could generate this in app, send to email, then have user confirm)
    checkVerifCode = document.getElementById('checkVerifCode');
    console.log("Entered Code: " + checkVerifCode.value);
    verifyBtn02();
}

//Signupdemo value fixes: 
function SignupStudent() { 
    signupUserType = "Student";
}
function SignupFaculty() { 
    signupUserType = "Faculty";
}
function SignupVisitor() { 
    signupUserType = "Visitor";
}