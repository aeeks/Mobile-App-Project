const firestore = firebase.firestore();
const auth = firebase.auth();

//This file shall be responsible for anything that involve firebase.


auth.onAuthStateChanged(user => { //This manages auth, if user is signed in, app is useable, if no user, app is returned to login/welcome screen
    var nav = document.getElementById('nav');
    if (user) {
        console.log("AUTH check: " + user.uid);
        navigate('profile');
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
        console.log(doc.data());
        document.getElementById("profPointsDisp").innerHTML = doc.data().points;
        document.getElementById("profEmailDisp").innerHTML = doc.data().email;
        document.getElementById("profPicDisplay").src = doc.data().photoURL;
    });
}

//Submits a new Event for the User.
function SubmitEvent() { //Triggered by the "submit event button"
    var eventName = document.getElementById('newEventName');
    var eventDescr = document.getElementById('newEventDescr');
    var newEventStartTime = (document.getElementById('newEventStartDate').value + 'T' + document.getElementById('newEventStartTime').value + 'Z');
    var startDate = new Date(newEventStartTime).getTime();
    var newEventEndTime = (document.getElementById('newEventEndDate').value + 'T' + document.getElementById('newEventEndTime').value + 'Z');
    var endDate = new Date(newEventEndTime).getTime();
    var createTime = Date.now(); //Shows timestamp of when event was submitted
    firestore.collection('events').doc().set({
        eventName: eventName.value,
        eventDescr: eventDescr.value,
        eventStartTime: startDate,
        eventEndTime: endDate,
        createdBy: auth.currentUser.uid, 
        createdTime: createTime
    });
    //Return to events page after event creation:
    GetEvents();
    navigate('events'); 
}

function GetEvents() {
    document.getElementById("eventContainer").innerHTML = "";
    console.clear();
    var RightNow = Date.now();
    console.log("now: " + RightNow);
    firestore.collection('events').get().then(snapshot => {
        snapshot.forEach(doc => {
            var eventStarting = new Date(doc.data().eventStartTime);
            var eventEnding = new Date(doc.data().eventEndTime);
            var checkEndTime = eventEnding.getTime();
            console.log("Eventendtime: " + eventEnding);
            if (checkEndTime - RightNow < 0) { 
                var eventBody = '<div class="panel-body"><h2>' + doc.data().eventName + '</h2><h3> ' + doc.data().eventDescr + '</h3><p><strong>Start Time: </strong>' + eventStarting + '<br /><strong>End Time: </strong>' + eventEnding  + '</p></div>';
                var eventContainer = document.getElementById("eventContainer"); 
                var eventItem = document.createElement("div"); 
                eventItem.setAttribute("class", "panel panel-default");
                eventItem.innerHTML = eventBody; 
                eventContainer.appendChild(eventItem); 
             }
            else {
                console.log("Event: " + doc.data().eventName + " Was excluded from the event listing page because it's time expired.");
            } 
        })
    })
}

//Updates the user's points by the specified integer parameter.
//Use when someone is confirmed at an event.
function AddPoints(points) {
    alert('test');
    var user = auth.currentUser;
    var userDoc = firestore.collection('users').doc(user.uid);
    userDoc.update({
        points: points
    }).then(() => {
        //The points were updated.
    }).catch(() => {
        //Something went wrong.
    });
}