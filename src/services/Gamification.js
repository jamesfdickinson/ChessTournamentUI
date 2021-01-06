
export default class Gamification {
    constructor() {
        this.version = "1.0.0.0";
        this.baseUrl = "https://gamification.jdsoftwarellc.com/";
        //this.baseUrl = "http://localhost:54223/"; 
        this.gameId = 6;

    }
    GetUser(id, gameId) {
        if (!gameId && gameId != 0) gameId = this.gameId;
        if (!id) return Promise.reject("no user id");
        let url = this.format("api/User/{0}?gameId={1}", id, gameId);
        url = this.baseUrl + url;

        //send data
        return this.MakeRequest("GET", url).then(function (data) {
            return JSON.parse(data);
        });
    }
    format(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    }
    MakeRequest(method, url, data, ContentType) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("cache-control", "private");
            if (ContentType) xhr.setRequestHeader("Content-type", ContentType);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    // var returnData = JSON.parse(xhr.responseText);
                    resolve(xhr.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            if (!data)
                xhr.send();
            else
                xhr.send(data);
        });
    }
}