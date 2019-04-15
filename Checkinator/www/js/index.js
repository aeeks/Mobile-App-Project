const db = firebase.firestore(); //main Firestore Database ref
const eventsFS = db.collection('events'); //DB Ref for Events setting and getting
const userFS = db.collection('users'); //DB Ref for users (this may be removed soon)
const auth = firebase.auth(); //auth stuff
var RightNow = new Date(); //Used for account creation ()
var UnixTime;// = Date.now();
var user = firebase.auth().currentUser; //Return current UID 
var a, b, c; //Used for page changing
var UID =0; //Sets this to 0 default until someone logs in so js doesnt bitch about undefined variables

//

//userAuthCheck(); //Partially replaced by function userAuthCheck(), but uncomment this if anyhting breaks and cant login/print UID at some point

function getEvents() { //replaces contentLoaderDemo, loads events from firestore (db.events), dynamically places them with bootstrap styling
    console.clear();
    UnixTime = Date.now();
    document.getElementById("eventContainer").innerHTML = ""; 
    eventsFS.get().then(snapshot => {
            snapshot.forEach(doc => { //This isnt an HTML list, but ive used var names ul and li since its basically a list ;-) This uses Bootstrap-3 panels for the event data (event data is dumped into to the eventContainer DIV in no particular order from firestore)
            //Determine if event should be shown based on CURRENT unix time (from this) compared to EVENT END unix time (from db):
            //Get date from event: 
            var eventEnd = doc.data().eventEnd;
            if (eventEnd - UnixTime > 0) { 
            //If event can still be attended based on end time, show it on the events page: 
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
            console.log("Created By: " + doc.data().createdBy); //If the event was created before createdBy was added to eventDB storage, this will be "undefined"
            console.log("---");
            } else { console.log("Event: " + doc.data.eventName + " Was excluded from the event listing page.")}
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
      })

      firebase.auth().onAuthStateChanged(function(user) { //This manages auth, if user is signed in, app is useable, if no user, app is returned to login/welcome screen (SAME AS userAuthCheck function)
        if (user) {
            UID = user.uid;
            console.log("AUTH check: " + UID);
            document.getElementById("welcome").style.display = 'none'; 
            document.getElementById("signup").style.display = 'none'; 
            document.getElementById('profile').style.display = 'block'; 
            document.getElementById('navMain').style.display = 'block'; 
        } else {
            console.log("AUTH check: No user signed in");
            document.getElementById("welcome").style.display = 'block'; 
            document.getElementById('profile').style.display = 'none'; 
            document.getElementById('navMain').style.display = 'none'; 
        }
      }); 
}

function getSignup() { //create user account
    var signupEmail = document.getElementById('signupEmail');
    var signupPasswd = document.getElementById('signupPasswd');
    var signupFname = document.getElementById('signupFname');
    var signupLname = document.getElementById('signupLname');
    console.log(" Entered Email: " + signupEmail.value + " Entered Password: " + signupPasswd.value);

    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPasswd.value).catch(function(error) { //Maybe dont use auth, it might be easier to just use database as auth and firestore are 2 different things 
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
      }); 
}

firebase.auth().onAuthStateChanged(function(user) { //This manages auth, if user is signed in, app is useable, if no user, app is returned to login/welcome screen
    if (user) {
        UID = user.uid;
        console.log("AUTH check: " + UID);
        document.getElementById("welcome").style.display = 'none'; 
        document.getElementById("signup").style.display = 'none'; 
        document.getElementById('profile').style.display = 'block'; 
        document.getElementById('navMain').style.display = 'block'; 
    } else {
        console.log("AUTH check: No user signed in");
        document.getElementById("welcome").style.display = 'block'; 
        document.getElementById('profile').style.display = 'none'; 
        document.getElementById('navMain').style.display = 'none'; 
    }
  }); 

function signOutUser() { 
    UID= 0;
    firebase.auth().signOut();
}

function createEventFB() { //For event creator button 
    document.getElementById('profile').style.display = 'none'; 
    document.getElementById('eventCreator').style.display = 'block'; 
}

function submitEvent() { //Triggered by the "submit event button"
    //Send entered data to firebaseDB:
    var newEventName = document.getElementById('newEventName');
    var newEventDescr = document.getElementById('newEventDescr');
    var newEventStart = document.getElementById('newEventStartTime');
    var newEventEnd = document.getElementById('newEventEndTime');
    //Convert the date to UNIXTime:
    var newEventSUnix = new Date(newEventStart.value).getTime() / 1000;
    console.log(newEventSUnix);
    eventsFS.doc().set({
        eventName: newEventName.value,
        eventDescr: newEventDescr.value,
        eventStart: 0,
        eventEnd: 0,
        createdBy: UID
    });
    //Return to profile page after event creation: 
    document.getElementById('profile').style.display = 'block'; 
    document.getElementById('eventCreator').style.display = 'none'; 
}

function signupBtn() { //Start account creation (from welcome screen)
    a = document.getElementById("welcome"); //turns visibility off for this div
    a.style.display = 'none';
    b = document.getElementById('signup'); //turns visibility on for this div
    b.style.display = 'block';
}

/* Tricky navbar page changing solution:  (Dont remove this) */
function navEvents() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('feed'); 
    b.style.display = 'block';
}

function navProfile() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    }
    b = document.getElementById('profile'); 
    b.style.display = 'block';
}

function navCheckIn() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('nfcCheckIn'); 
    b.style.display = 'block';
}

function userAuthCheck() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            UID = user.uid;
            console.log(UID);
        } else {
            console.log("No user is signed in ")
        }
      });
} 