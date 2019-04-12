var signupUserType;
var verifCode;
var checkVerifCode;
var userEventPoints = 0;
const db = firebase.firestore();
const eventsFS = db.collection('events');

//

/* 
function contentLoaderDemo() { //Loading content into the events section automatically (could be from internet source)
    document.getElementById("eventContainer").innerHTML = '<div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div><div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div>';
    //Load this: <div class="row eventListingBorders"><h1>Event</h1><br/><p>Time, place</p></div>
} */

function getEvents() { //replaces contentLoaderDemo, loads events from firestore (db.events), dynamically places them with bootstrap styling
    document.getElementById("eventContainer").innerHTML = ""; 
    eventsFS.get().then(snapshot => {
            snapshot.forEach(doc => {
            var eventDetails = '<div class="panel-body"><h2>' + doc.data().eventName + '</h2>' + '<br /><p>'  +  doc.data().eventDescr + '</p></div>';
            var ul = document.getElementById("eventContainer");
            var li = document.createElement("div");
            li.setAttribute("class", "panel panel-default")
            li.innerHTML = eventDetails;
            ul.appendChild(li);
            //
            console.log("---");
            console.log(doc.data().eventName);
            console.log(doc.data().eventDescr);
            console.log("---");
        });
      });
}

function getLogin() { // sign into user account 
    var userEmail = document.getElementById('userEmail');
    var userPasswd = document.getElementById('userPasswd');
    console.log("Entered Email: " + userEmail.value + "Entered Password: " + userPasswd.value);
    
    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPasswd.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
      });
}

function getSignup() { //create user account
    var signupEmail = document.getElementById('signupEmail');
    var signupPasswd = document.getElementById('signupPasswd');
    console.log("Entered Email: " + signupEmail.value + " Entered Password: " + signupPasswd.value + "User Type: " + signupUserType);
    

    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPasswd.value).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
        //Creating storage for the new user in firestore (for points and such): 


      });
    //Reloads page after creating account:
}

function getVerifCode(){ 
    verifCode = 123456789; //this should be set to the value that the user needs to match in order to activate an account (from internet source or maybe could generate this in app, send to email, then have user confirm)
    checkVerifCode = document.getElementById('checkVerifCode');
    console.log("Entered Code: " + checkVerifCode.value);
    verifyBtn02();
}

//Signupdemo value fixes:    TODO: I need to code this properly :-) 

function setUserType() { 
    signupUserType = "USER";
}

//FIREBASE CODE

firebase.auth().onAuthStateChanged(function(user) { //need to add signup here as well to hide that after signing up 
    if (user) {
        document.getElementById("welcome").style.display = 'none'; 
        document.getElementById("signup").style.display = 'none';
        document.getElementById('profile').style.display = 'block'; 
        document.getElementById('navMain').style.display = 'block'; 
    } else {
        document.getElementById("welcome").style.display = 'block'; 
        document.getElementById('profile').style.display = 'none'; 
        document.getElementById('navMain').style.display = 'none'; 
    }
  });

function signOutUser() { 
    firebase.auth().signOut()
}

function createEventFB() { 
    document.getElementById('profile').style.display = 'none'; 
    document.getElementById('eventCreator').style.display = 'block'; 
}

function submitEvent() { 
    //Send entered data to firebaseDB:
    var newEventName = document.getElementById('newEventName');
    var newEventDescr = document.getElementById('newEventDescr');
    eventsFS.doc().set({
        eventName: newEventName.value,
        eventDescr: newEventDescr.value
    });
    
    //Return to profile page: 
    document.getElementById('profile').style.display = 'block'; 
    document.getElementById('eventCreator').style.display = 'none'; 
}