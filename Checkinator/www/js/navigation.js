var a;
var b;
var c;
var currentUser = firebase.auth().currentUser;
var UID;

function signupBtn() {
    a = document.getElementById("welcome"); //turns visibility off for this div
    a.style.display = 'none';
    b = document.getElementById('signup'); //turns visibility on for this div
    b.style.display = 'block';
}

function verifyBtn01() { 
    a = document.getElementById("signup"); 
    a.style.display = 'none';
    b = document.getElementById('verify'); 
    b.style.display = 'block';
}

function verifyBtn02() { 
    a = document.getElementById("verify"); 
    a.style.display = 'none';
    b = document.getElementById('profile'); 
    b.style.display = 'block';
    c = document.getElementById('navMain'); 
    c.style.display = 'block';
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

    
    //Points Display/ Returning FS data to the profile page onclick
/*     usersFS.get(currentUser).then(snapshot => { 
        var pointsDisp = document.getElementById("profPointsDisp"); 
        var nameDisp = document.getElementById("profFNDisp"); 
        pointsDisp.innerHTML = doc.data().points; 
        nameDisp.innerHTML = doc.data().fname; 
        console.log("---");
        console.log(currentUser + "'s Stats: ");
        console.log(doc.data().fname);
        console.log(doc.data().points);
        console.log("---");
  }); */
    UID = currentUser.uid;
    console.log(UID);
}

function navCheckIn() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('nfcCheckIn'); 
    b.style.display = 'block';
}