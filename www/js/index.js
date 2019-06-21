/* document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);

} */

/* ons.ready(function() {
    window.fn = {};

    window.fn.open = function() {
        var menu = document.getElementById('menu');
        menu.open();
        firestore.collection('users').doc(auth.currentUser.uid).get().then(doc => { //This is cheap but it works :) 
            document.getElementById("menuPic").src = doc.data().photoURL;
            document.getElementById("menuName").innerHTML = doc.data().fName;
        });
    };

    window.fn.load = function(page) {
        var content = document.getElementById('content');
        var menu = document.getElementById('menu');
        content.load(page)
            .then(menu.close.bind(menu));
    };


}); */