var a;
var b;
var c;

//Replaced by Firebase Login code
/* function loginBtn() {
    a = document.getElementById("welcome"); 
    a.style.display = 'none';
    b = document.getElementById('feed'); 
    b.style.display = 'block';
    c = document.getElementById('navMain'); 
    c.style.display = 'block';
}
 */

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

/* Tricky navbar page changing solution:  */
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