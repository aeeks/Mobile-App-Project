var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        navigate('login');

        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "NFC Error");
        }
        nfc.addMimeTypeListener(
            'text/upb',
            app.onNdef,
            function() {
                console.log("NFC Good");
            },
            failure
        );
        nfc.addTagDiscoveredListener(
            /* app.onNfc, */
            app.onNdef,
            function() {
                console.log("Listening for non-NDEF tags.");
            },
            failure
        );
        nfc.addNdefListener(
            app.onNdef,
            function() {
                console.log("Listening for NDEF tags.");
            },
            failure
        );
    },

    onNdef: function(nfcEvent) {
        var tagMsg = nfcEvent.tag.ndefMessage[0]["payload"];
        var decodedMsg = nfc.bytesToString(tagMsg);
        var user = auth.currentUser;
        //firstore event_visits: 
        var eventDoc = firestore.collection('event_visits').doc(decodedMsg); //only for If statement
        //firestore event_visits:UID collection: 
        var attendColl = firestore.collection('event_visits').doc(decodedMsg).collection(user.uid); //only for If statement pt.2
        //Check, Check, Add pts/record
        eventDoc.get()
            .then((eventExist) => { //check if event that tag references  exists
                if (eventExist.exists) {
                    attendColl.get()
                        .then((attendColl) => { //check if the user has already checked into the event that exists
                            if (attendColl.exists) {
                                alert("You have already been checked into this event.");
                            } else {
                                //add user to collection and give points
                                alert("You have been checked into the event!");
                                //eventDoc.collection(user.uid).set(); //Create user entry into event_visits here 
                                firestore.collection('event_visits').doc(decodedMsg).collection(user.uid).doc("attend").set({ attend: '1' });
                                var points = 1;
                                AddPoints(points); //Each event currently worth 1 point
                            }
                        });
                } else { alert("This tag is not currently used by any event."); }
            });
    },
}

app.initialize();

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