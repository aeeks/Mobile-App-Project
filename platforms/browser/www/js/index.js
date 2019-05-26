document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.camera);

}

ons.ready(function() {
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

});

/* function initPullHook() {
    var pullHook = document.getElementById('pull-hook');

    pullHook.addEventListener('changestate', function(event) {
        var message = '';

        switch (event.state) {
            case 'initial':
                message = 'Pull to refresh';
                break;
            case 'preaction':
                message = 'Release';
                break;
            case 'action':
                message = 'Loading...';
                break;
        }

        pullHook.innerHTML = message;
    });

    pullHook.onAction = function(done) {
        setTimeout(done, 1000);
    };
}; */