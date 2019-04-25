const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

//This file shall be responsible for anything that involve firebase.

auth.onAuthStateChanged(user => { //This manages auth, if user is signed in, app is useable, if no user, app is returned to login/welcome screen
    var nav = document.getElementById('nav');
    if (user) {
        console.log("AUTH check: " + user.uid);
        navigate('profile');
        GetProfile();
        nav.style.display = 'block';
    } else {
        console.log("AUTH check: No user signed in");
        navigate('login');
        nav.style.display = 'none';
    }
});

//Logs in the User
function LoginUser() {
    /* alert('logging in user'); */
    var userEmail = document.getElementById('userEmail');
    var userPasswd = document.getElementById('userPasswd');
    console.log("Entered Email: " + userEmail.value + "Entered Password: " + userPasswd.value);

    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPasswd.value).catch(err => {
        // Handle Errors here.
        var errorCode = err.code;
        var errorMessage = err.message;
        window.alert("Error: " + err.message);
    })
}

//Signs the User Out
function SignOutUser() {
    auth.signOut();
    navigate('login')
}

//Signs the User Up
function SignupUser() { //create user account
    var signupEmail = document.getElementById('signupEmail');
    var signupPasswd = document.getElementById('signupPasswd');
    var signupFname = document.getElementById('signupFname');
    var signupLname = document.getElementById('signupLname');
    console.log(" Entered Email: " + signupEmail.value + " Entered Password: " + signupPasswd.value);

    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPasswd.value).then(cred => {
        return firestore.collection('users').doc(cred.user.uid).set({
            email: signupEmail.value, 
            //Dont Store Passwords. 
            fName: signupFname.value, 
            lName: signupLname.value, 
            points: 0,
            photoURL: 'https://media-speakerfile-pre.s3.amazonaws.com/images_avatars/c9b1742218d45ccf287f701120b741391491336117_l.jpg'
        })
    }).catch(function (error) { //Maybe dont use auth, it might be easier to just use database as auth and firestore are 2 different things 
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
    });
}

//Retrieve user data from firestore based on current user ID:
function GetProfile() { 
    //Clear any prev data:
    document.getElementById("profPointsDisp").innerHTML = "";
    document.getElementById("profEmailDisp").innerHTML = "";
    
    firestore.collection('users').doc(auth.currentUser.uid).get().then(doc => {
        /* console.log(doc.data()); */
        document.getElementById("profPointsDisp").innerHTML = doc.data().points + " Points";
        document.getElementById("profEmailDisp").innerHTML = doc.data().email;
        document.getElementById("profPicDisplay").src = doc.data().photoURL;
    });
}

//Submits a new Event for the User.
function SubmitEvent() { //Triggered by the "submit event button"
    var eventName = document.getElementById('newEventName');
    var eventDescr = document.getElementById('newEventDescr');

    var newEventStartTime = (document.getElementById('newEventStartDate').value + 'T' + document.getElementById('newEventStartTime').value + 'Z');

    var startD = new Date(newEventStartTime);
    startD.setHours (startD.getHours() + 4); //-4 Hours fix

    var newEventEndTime = (document.getElementById('newEventEndDate').value + 'T' + document.getElementById('newEventEndTime').value + 'Z');

    var endD = new Date(newEventEndTime);
    endD.setHours (endD.getHours() + 4); //-4 Hours fix
    var startDate = startD.toString();
    var endDate = endD.toString();

    var createTime = Date.now(); //Shows timestamp of when event was submitted, and also functions as the Unique ID of the event 
    var eventID = createTime.toString(); //Need to convert to a string else firebase throws errors
    firestore.collection('events').doc(eventID).set({
        eventName: eventName.value,
        eventDescr: eventDescr.value,
        eventStartTime: startDate,
        eventEndTime: endDate,
        createdBy: auth.currentUser.uid, 
        createdTime: createTime
    });

    //Create a DB entry to later check/set attendance from event_visits table:
    firestore.collection('event_visits').doc(eventID).set({
        event: eventName.value
    });

    //Write a tag that corresponds to the Event now (based on the Unique event ID/createTime string var): 
    //Caution: Overwrites tags without warning, unused for now 

/*     var mimeType = "text/upb",
    payload = eventID,
    record = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));
    nfc.write([record], function () {alert("Write Successful!");}, );   */

    //Return to events page after event creation:
    navigate('events'); 
    GetEvents();
}

function GetEvents() {
    document.getElementById("eventContainer").innerHTML = "";
    console.clear();
    var RightNow = Date.now();
    console.log("Time now: " + RightNow);
    firestore.collection('events').get().then(snapshot => {
        snapshot.forEach(doc => {
/*             var eventStarting = new Date((doc.data().eventStartTime));
            var eventEnding = new Date((doc.data().eventEndTime));
            var checkEndTime = eventEnding.getTime();
            console.log("Eventendtime: " + eventEnding); */
/*             if (RightNow - checkEndTime < 0) { //Disabled, for some reason everything is expired
                console.log("Event: " + doc.data().eventName + " was printed to the screen.");
                var eventBody = '<div class="panel-body"><h2>' + doc.data().eventName + '</h2><h3> ' + doc.data().eventDescr + '</h3><p><strong>Start Time: </strong>' + eventStarting + '<br /><strong>End Time: </strong>' + eventEnding  + '</p></div>';
                var eventContainer = document.getElementById("eventContainer"); 
                var eventItem = document.createElement("div"); 
                eventItem.setAttribute("class", "panel panel-default");
                eventItem.innerHTML = eventBody; 
                eventContainer.appendChild(eventItem); 
             }
            else {
                console.log("Event: " + doc.data().eventName + "Was excluded from the event listing page because it's time expired.");
            }  */


            //Non-sorting, non-filtering GetEvents() code: 
            //var datePrintOps = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; Can use maybe, for formatting dates better 
            var eventStarting = new Date(doc.data().eventStartTime);
            var eventEnding = new Date(doc.data().eventEndTime);

            var eventBody = '<div class="panel-body"><h2>' + doc.data().eventName + '</h2><h3> ' + doc.data().eventDescr + '</h3><p><strong>Start Time: </strong>' + eventStarting.toLocaleString("en-US") + '<br /><strong>End Time: </strong>' + eventEnding.toLocaleString("en-US")  + '</p></div>';
            var eventContainer = document.getElementById("eventContainer"); 
            var eventItem = document.createElement("div"); 
            eventItem.setAttribute("class", "panel panel-default");
            eventItem.innerHTML = eventBody; 
            eventContainer.appendChild(eventItem); 


        })
    })
}

//Updates the user's points by the specified integer parameter.
//Use when someone is confirmed at an event.
function AddPoints(points) {
    alert('Adding points');
    var user = auth.currentUser;
    var userDoc = firestore.collection('users').doc(user.uid);
    var newPoints = userDoc.data().points + points;
    userDoc.update({
        points: newPoints
    }).then(() => {
        //The points were updated.
    }).catch(() => {
        alert("Error adding points");
    });
}


//EditProfilePicture
function editProfPic() { 

}

//EditPassword
function changePassword() { 
    var auth = firebase.auth();
    var emailto = document.getElementById("emailto").value; 
    auth.sendPasswordResetEmail(emailto).then(function() {
    // Email sent.
    }).catch(function(error) {
    console.log(error);
    });
    SignOutUser();
    navigate('login');
}