export default class AnalyticsJI {
    constructor() {
        this.appName = "NoName";
        this.version = "1.0.0.0";
        this.os = "unknown";
        this.sessionid = null;
        this.uuid = null;

        //try using cordova
        if (typeof device !== "undefined" && device.uuid !== "undefined") {
            this.uuid = device.uuid;
        }

        //if device id not exist create one and save it
        if (this.uuid === null && localStorage) {
            this.uuid = localStorage.getItem("uuid");
            if (this.uuid === null) {
                this.uuid = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;//get random number:Math.floor(Math.random() * (max - min + 1)) + min;
                localStorage.setItem('uuid', this.uuid);
            }
        }
        //else just give it an id
        if (this.uuid === null) {
            this.uuid = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;//get random number:Math.floor(Math.random() * (max - min + 1)) + min;
        }


        //get session id
        if (this.sessionid === null && sessionStorage) {
            this.sessionid = sessionStorage.getItem("sessionid");
            if (this.sessionid === null) {
                this.sessionid = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;//get random number:Math.floor(Math.random() * (max - min + 1)) + min;
                sessionStorage.setItem('sessionid', this.sessionid);
            }
        }
        if (this.sessionid === null) {
            this.sessionid = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;//get random number:Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    TrackStart(appName, version, os) {
        if (!os) os = this.GetOS();

        this.appName = appName;
        this.version = version;
        this.os = os;

        this.Track("Start");
    };
    TrackPage(page, urlParameters) {
        this.Track("PageView", page, urlParameters);
    };

    Track(Event, parameter1, parameter2) {
        var appName = this.appName;
        var version = this.version;
        var os = this.os;
        var uuid = this.uuid;
        var sessionid = this.sessionid;

        //get CurrentCulture
        var currentCulture = window.navigator.userLanguage || window.navigator.language;//works IE/SAFARI/CHROME/FF

        this.SendData(appName, version, Event, parameter1, parameter2, currentCulture, sessionid, uuid, os);
    };
    GetOS() {
        var os = "Other";
        var ua = navigator.userAgent;
        var isKindle = /Kindle/i.test(ua) || /Silk/i.test(ua) || /Amazon/i.test(ua) || /KFTT/i.test(ua) || /KFOT/i.test(ua) || /KFJWA/i.test(ua) || /KFJWI/i.test(ua) || /KFSOWI/i.test(ua) || /KFTHWA/i.test(ua) || /KFTHWI/i.test(ua) || /KFAPWA/i.test(ua) || /KFAPWI/i.test(ua);

        if(typeof FBInstant !== "undefined"){
            os = "FBMessenger"; 
            return os;
        }

        if (/(android)/i.test(navigator.userAgent) && isKindle) {
            os = "Amazon";
        }
        else if (/(android)/i.test(navigator.userAgent) && !isKindle) {
            os = "Android";
        }
        else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            os = "iOS";
        }
        else if (/(windows phone)/i.test(navigator.userAgent)) {
            os = "WindowsPhone";
        }
        else if (/(windows)/i.test(navigator.userAgent)) {
            os = "Windows";
        }

        // var isCordovaApp = !!window.cordova;
        // if (isCordovaApp) {
        //     os = os + "Mobile";
        // }

        return os;
    }

    SendData(AppName, Version, Event, parameter1, parameter2, CurrentCulture, SessionID, DeviceUniqueID, OS) {

        //send data
        var xmlHttp = null;
        var theUrl = "https://www.jimmyinteractive.com/WP7/Service.svc/LogEvent?";

        if (window.location.protocol === "http:")
            theUrl = "http://www.jimmyinteractive.com/WP7/Service.svc/LogEvent?";

        //if undefined return string
        if (!CurrentCulture) CurrentCulture = "";
        if (!DeviceUniqueID) DeviceUniqueID = "";
        if (!SessionID) SessionID = "";
        if (!Version) Version = "";
        if (!parameter1) parameter1 = "";
        if (!parameter2) parameter2 = "";
        //if (!LiveAnonymousID) LiveAnonymousID = "";
        if (!OS) OS = "";

        CurrentCulture = encodeURIComponent(CurrentCulture);
        DeviceUniqueID = encodeURIComponent(DeviceUniqueID);
        SessionID = encodeURIComponent(SessionID);
        Version = encodeURIComponent(Version);
        parameter1 = encodeURIComponent(parameter1);
        parameter2 = encodeURIComponent(parameter2);
        OS = encodeURIComponent(OS);


        theUrl = theUrl + "AppName=" + AppName
            + "&Event=" + Event
            + "&Culture=" + CurrentCulture
            + "&DeviceUniqueID=" + DeviceUniqueID
            + "&SessionID=" + SessionID
            + "&Version=" + Version
            + "&Parameter1=" + parameter1
            + "&Parameter2=" + parameter2
            + "&LiveAnonymousID=" //+ LiveAnonymousID
            + "&OS=" + OS
            + "&Random=" + Math.floor(Math.random() * 1000000);

        try {
            xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send(null);
        } catch (ex) {
            //log error, but in this case we dont care
            var error = ex;
        }

    }
}


