
class Firebase {
    constructor() {
        this.firebase = window.firebase;
        this.messaging = null;
        this.onMessage = function () { };
        this.onTokenUpdated = function () { };
    }
    init() {
        if (typeof this.firebase == "undefined") {
            console.log("firebase SDK is missing");
            return false;
        }
        if (this.messaging !== null) {
            console.log("firebase messaging SDK is already set up");
            return true;
        }
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBU3D8WfdEBXCInbxOSgboSg_X53GKmTb4",
            authDomain: "chesstournament-6213e.firebaseapp.com",
            databaseURL: "https://chesstournament-6213e.firebaseio.com",
            projectId: "chesstournament-6213e",
            storageBucket: "chesstournament-6213e.appspot.com",
            messagingSenderId: "856411545072",
            appId: "1:856411545072:web:7bbfef052df0682d471135",
            measurementId: "G-NK2CBEFFH4"
        };
        try {
            // Initialize Firebase
            this.firebase.initializeApp(firebaseConfig);
            this.firebase.analytics();

            this.messaging = this.firebase.messaging();
            // Add the public key generated from the console here.
            this.messaging.usePublicVapidKey('BFIyIl6bKz-lgbq-LZwGsk3u93IsJW6dhuW9oCj6BhovfFBSpqO4-D_njHPa2-NW8Bhmps9ocu_Ahgg0rKOBsEA');
            this.messaging.onMessage(function (payload) {
                console.log('Message received. ', payload);
                if (this.onMessage) this.onMessage(payload);
            }.bind(this));
            this.messaging.onTokenRefresh(() => {
                this.messaging.getToken().then((refreshedToken) => {
                    if (this.onTokenUpdated) this.onTokenUpdated(refreshedToken);
                }).catch((err) => {
                    console.log('Unable to retrieve refreshed token ', err);
                });
            });
        } catch (ex) {
            console.warn('Firebase Init(): ', ex.message);
        }

    }
    requestPermission() {
        return window.Notification.requestPermission();
    }
    getToken() {
        if (this.messaging === null) {
            this.init();
        }
        return this.messaging.getToken().then((token) => {
            if (this.onTokenUpdated) this.onTokenUpdated(token);
            return token;
        });
    }
}
export default new Firebase();