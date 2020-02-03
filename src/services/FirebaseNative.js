//https://github.com/chemerisuk/cordova-plugin-firebase-messaging
//https://medium.com/glucosio-project/whats-new-in-firebase-cloud-messaging-and-how-to-migrate-from-gcm-578019c2167d
export default class FirebaseNative {
    constructor() {
        this.onMessage = function () { };
        this.onTokenUpdated = function (token, deviceId) { };
        this.hasInited;
    }
    isAvailable() {
        let found = !(typeof cordova == 'undefined' || typeof cordova.plugins == 'undefined' || typeof cordova.plugins.firebase == 'undefined');
        return found;
    }
    init() {
        if (this.HasInited == true) return;
        this.HasInited = true;

        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    }
    onDeviceReady() {
        // only trigger once
        document.removeEventListener('deviceready', this.onDeviceReady, false);
        if (typeof cordova == 'undefined' || typeof cordova.plugins == 'undefined' || typeof cordova.plugins.firebase == 'undefined') {
            console.error("cordova.plugins.firebase.messaging plugin is missing");
            return;
        }

        cordova.plugins.firebase.messaging.onMessage(function (payload) {
            console.log("New foreground FCM message: ", payload);
            var data = payload;
            this.Message(data);
        }.bind(this));

        cordova.plugins.firebase.messaging.onBackgroundMessage(function (payload) {
            console.log("New background FCM message: ", payload);
            var data = payload;
            this.Message(data);
        }.bind(this));

        cordova.plugins.firebase.messaging.onTokenRefresh(function () {
            cordova.plugins.firebase.messaging.getToken().then(function (token) {
                if (this.onTokenUpdated)
                    this.onTokenUpdated(token);
            }.bind(this));
        }.bind(this));

    }
    requestPermission() {
        //todo: change to event 'deviceready' and promise waiting for the results or timing out.
        if (typeof cordova == 'undefined' || typeof cordova.plugins == 'undefined' || typeof cordova.plugins.firebase == 'undefined') {
            console.error("cordova.plugins.firebase.messaging plugin is missing");
            return new Promise.reject("cordova.plugins.firebase.messaging plugin is missing");
        }
        return cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function () {
            console.log("You'll get foreground notifications when a push message arrives");
        }.bind(this));
    }
    getToken() {
        if (typeof cordova == 'undefined' || typeof cordova.plugins == 'undefined' || typeof cordova.plugins.firebase == 'undefined') {
            return new Promise.reject("cordova.plugins.firebase.messaging plugin is missing");
        }
        return cordova.plugins.firebase.messaging.getToken();
    }
    message(data) {

        //extract message
        if (data && !data.message) {
            if (data.gcm) data.message = data.gcm.body;
            if (data.aps && data.aps.alert) data.message = data.aps.alert.body;
        }
        //trigger event
        if (this.onMessage)
            this.onMessage(data);
    };
}    
