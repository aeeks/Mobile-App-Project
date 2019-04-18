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
        
    }
}

GetEvents()