var app = {
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
    },

    deviceready: function() {
        /* console.log("Device Ready"); */
        navigate('login');
        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "NFC Error");
        }
        //Listen for tags with type "text/upb", setting all possible listeners so that the default Android tag program doesnt steal focus...
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

    onNdef: function (nfcEvent) { //This listener typically works
        //Translate Payload: 
        var tag = nfcEvent.tag; //Maybe dont need this? leave for now tho 
        var tagMsg = nfcEvent.tag.ndefMessage[0]["payload"];
        var decodedMsg = nfc.bytesToString(tagMsg);
        /* alert("Tag Payload: " + decodedMsg); */
 
        var eventRef = firestore.collection('event_visits').doc(decodedMsg);
        //check if event exists: 
        eventRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                eventRef.onSnapshot((doc) => {
                    var visitName = doc.data().event;
                    var user = auth.currentUser.toString();
                    alert("Checked into event: " + visitName);//still need to check user checkin status 
                    /* firestore.collection('event_visits').doc(decodedMsg).set(currentUserRef, { merge: true }); */
                    firestore.collection('event_visits').doc(decodedMsg).set({uid: user.value});
                });
                } 
                else {
                    alert("No event matches this tag");
                }
        });
    },
}

function navigate(pageName) {
    var currentPageName = localStorage.getItem('currentPage');
    if (currentPageName) {
        var currentPage = document.getElementById(currentPageName);
        currentPage.style.display = 'none';   
    }
    localStorage.setItem('currentPage', pageName)
    newPage = document.getElementById(pageName);
    newPage.style.display = 'block';
}

app.initialize();