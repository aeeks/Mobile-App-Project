const firestore = firebase.firestore();
const auth = firebase.auth();
var AccountLevel; //1,2,3,4, 1=user, 2=super user, 3=admin, 4=super admin/dev
var AccountLevelStr;
var OrgAffiliation; //specifies Which club/organization the user is in 
var ProfilePicture;


auth.onAuthStateChanged(user => {
    if (user) {
        firestore.collection('users').doc(auth.currentUser.uid).get().then(doc => {
            AccountLevel = doc.data().accountLevel;
            OrgAffiliation = doc.data().inOrg;
            if (AccountLevel == 1) {
                AccountLevelStr = "Student";
                document.getElementById(id).style.display = 'block';
            } else if (AccountLevel == 2) {
                AccountLevelStr = "Student Admin";
            } else if (AccountLevel == 3) {
                AccountLevelStr = "Faculty";
            } else if (AccountLevel == 4) {
                AccountLevelStr = "Developer";
            }
        });
        fn.load('LandingPage.html');
        setTimeout(GetEventsAgain, 2000); /* Quick fix for the events loading problem :-) */
    } else {
        fn.load('Welcome.html');
    }
});

function GetEventsAgain() {
    GetEvents();
}

//Logs in the User
function LoginUser() {
    var userEmail = document.getElementById('loginUsername');
    var userPasswd = document.getElementById('loginPassword');
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
    fn.load('Welcome.html');
}

//Signs the User Up
function SignupUser() { //create user account
    var signupEmail = document.getElementById('signupUsername').value;
    var signupPasswd = document.getElementById('signupPassword').value;
    var signupFname = document.getElementById('signupFname').value;
    var signupLname = document.getElementById('signupLname').value;

    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPasswd).then(cred => {
        return firestore.collection('users').doc(cred.user.uid).set({
            email: signupEmail,
            fName: signupFname,
            lName: signupLname,
            accountLevel: 0,
            points: 0,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/upb-events.appspot.com/o/profilepictures%2Fdefault.png?alt=media&token=e218dfa5-c0f3-4c91-85ce-352e93ec2a88'
        })
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
    });
}

//Retrieve user data from firestore based on current user ID:
function GetProfile() {
    firestore.collection('users').doc(auth.currentUser.uid).get().then(doc => {
        document.getElementById("picDisp").src = doc.data().photoURL;
        document.getElementById("nameDisp").innerHTML = doc.data().fName;
        document.getElementById("accountLevel").innerHTML = AccountLevelStr;
    });
}

//Submits a new Event for the User.
function SubmitEvent() {
    var eventName = document.getElementById('newEventName').value;
    var eventLoc = document.getElementById('newEventLoc').value;

    var newEventStartTime = (document.getElementById('newEventStartDate').value + 'T' + document.getElementById('newEventStartTime').value + 'Z');

    var startD = new Date(newEventStartTime);
    startD.setHours(startD.getHours() + 4); //-4 Hours fix

    var newEventEndTime = (document.getElementById('newEventEndDate').value + 'T' + document.getElementById('newEventEndTime').value + 'Z');

    var endD = new Date(newEventEndTime);
    endD.setHours(endD.getHours() + 4); //-4 Hours fix
    var startDate = startD.toString();
    var endDate = endD.toString();

    var forBadge = document.getElementById('selectBadge').value;

    var createTime = Date.now(); //Shows timestamp of when event was submitted, and also functions as the Unique ID of the event 
    var eventID = createTime.toString(); //Need to convert to a string else firebase throws errors
    firestore.collection('events').doc(eventID).set({
        eventName: eventName,
        eventLoc: eventLoc,
        eventStartTime: startDate,
        eventEndTime: endDate,
        forOrg: OrgAffiliation,
        forBadge: forBadge,
        createdBy: auth.currentUser.uid,
        createdTime: createTime
    });

    //Create a DB entry to later check/set attendance from event-visits table:
    firestore.collection('event-visits').doc(eventID).set({
        event: eventName
    });

    //Write a tag that corresponds to the Event now (based on the Unique event ID/createTime string var): 
    //Caution: Overwrites tags without warning, unused for now 

    //Return to events page after event creation:
    fn.load('Events.html');
    GetEvents();
}

function GetEvents() {
    var eventsContainer = document.getElementById("eventContainer");
    firestore.collection('events').get().then(snapshot => {
        eventsContainer.innerHTML = '';
        snapshot.forEach(doc => {
            var eventStarting = new Date(doc.data().eventStartTime);
            var eventEnding = new Date(doc.data().eventEndTime);


            var eventBody = '<ons-card><div class="title"><strong>' + doc.data().eventName + '</strong></div><div class="content"><h4>' + doc.data().eventLoc + '</h4><p><strong>Start Time: </strong>' + eventStarting.toLocaleString("en-US") + '</p><p><strong>End Time: </strong>' + eventEnding.toLocaleString("en-US") + '</p></div></ons-card>';

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
/* function AddPoints(points) {
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
} */

/*     function AddPoints(points) {
        
        var user = auth.currentUser;
        var userDoc = firestore.collection('users').doc(user.uid);
        var newPoints = Number(userDoc.data()).points + Number(points);
        userDoc.update({
            points: newPoints
        }).then(() => {
            //The points were updated.
        }).catch(() => {
            alert("Error adding points");
        });
    } */


//EditProfilePicture
function editProfPic() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    var userStorage = ('profilepictures/' + auth.currentUser.uid + '.png')
    var spaceRef = storageRef.child(userStorage);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // send to firebase, and set this image as the user's profile image reference in the db
        storageRef.put(imageuri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

//EditPassword
function changePassword() { //needs work
    var auth = firebase.auth();
    var emailto = document.getElementById("resetEmail").value;
    auth.sendPasswordResetEmail(emailto).then(function() {
        // Email sent.
    }).catch(function(error) {
        console.log(error);
    });
    SignOutUser();
}

function SupportTicket() { //this works for now (probably the quickest but least efficient way but whatev lol), we really dont need a support system, but incase of any bugs, this is a thing
    var subject = document.getElementById('supportSubject').value;
    var message = document.getElementById('supportMessage').value;
    firestore.collection('support').doc().set({
        subject: subject,
        message: message,
        sendingUser: auth.currentUser.uid
    });
    alert("Your message has been sent!");
    fn.load('Settings.html');
}

function adminUserInfo() {
    //Get username from input, get user data from firestore, print to a div for admin editing (permission level, group affiliation)
}