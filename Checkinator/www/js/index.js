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
        //Listen for tags with type "text/upb"
        nfc.addMimeTypeListener(
            'text/upb',
            app.onNdef,
            function() {
                console.log("NFC Listening");
            },
            failure
        );
    },

    onNdef: function (nfcEvent) {
        alert(JSON.stringify(nfcEvent.tag));
        var tag = nfcEvent.tag;
        // Android specific conversions: 
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }
        navigator.notification.vibrate(100);        
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