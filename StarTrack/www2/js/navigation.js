var a;
var b;
var c;

function loginBtn() {
    a = document.getElementById("welcome"); 
    a.style.display = 'none';
    b = document.getElementById('feed'); 
    b.style.display = 'block';
    c = document.getElementById('navMain'); 
    c.style.display = 'block';
}

function signupBtn() {
    a = document.getElementById("welcome"); //turn visibility off for this div
    a.style.display = 'none';
    b = document.getElementById('signup'); //turn visibility on for this div
    b.style.display = 'block';
}

function verifyBtn01() { 
    a = document.getElementById("signup"); //turn visibility off for this div
    a.style.display = 'none';
    b = document.getElementById('verify'); //turn visibility on for this div
    b.style.display = 'block';
}

function verifyBtn02() { 
    a = document.getElementById("verify"); //turn visibility off for this div
    a.style.display = 'none';
    b = document.getElementById('profile'); //turn visibility on for this div
    b.style.display = 'block';
    c = document.getElementById('navMain'); 
    c.style.display = 'block';
}

/* Tricky navbar page changing solution:  */
function navEvents() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('feed'); //turn visibility on for this div
    b.style.display = 'block';
}

function navProfile() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('profile'); //turn visibility on for this div
    b.style.display = 'block';
}

function navCheckIn() {
    elements = document.getElementsByClassName("navEvent0");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none"; 
    } 
    b = document.getElementById('nfcCheckIn'); //turn visibility on for this div
    b.style.display = 'block';
}