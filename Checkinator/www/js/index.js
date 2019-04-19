var app = {
    initialize: function () {
        this.bind();
    },
    bind: function () {
        document.addEventListener('deviceready', this.deviceready, false);
    },

    deviceready: function() {
        console.log("Device Ready");
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

    onNdef: function (nfcEvent) {

        //example for printing event details from tag to screen 
        var tag = nfcEvent.tag;
        var tagId = nfc.bytesToHexString(tag.id);
        navigator.notification.alert(tagId);
        var y=document.getElementById("tagContentOutput");
        y.innerHTML = tagId;


        /* alert(JSON.stringify(nfcEvent.tag)); */
        var tag = nfcEvent.tag;
        // Android specific conversions: 
/*         if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }
        navigator.notification.vibrate(100); */

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