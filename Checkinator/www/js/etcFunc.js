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
    verifCode = 123456789; //this should be set to the value that the user needs to match in order to activate an account (from internet source or maybe could generate this in app, send to email, then have user confirm)
    checkVerifCode = document.getElementById('checkVerifCode');
    console.log("Entered Code: " + checkVerifCode.value);
    verifyBtn02();
}

//Signupdemo value fixes:    TODO: I need to code this properly :-) 
function SignupStudent() { 
    signupUserType = "Student";
}
function SignupFaculty() { 
    signupUserType = "Faculty";
}
function SignupVisitor() { 
    signupUserType = "Visitor";
}