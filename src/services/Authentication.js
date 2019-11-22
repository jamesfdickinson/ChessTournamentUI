import fetch from "@/fetch.js";
export default class Authentication {
    constructor() {
    }
    login(username, password) {
        return fetch.post(`authentication`, { username, password })
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            });
    }
    logout(){
        localStorage.clear("user");
    }
    loggedIn () {
        return !!localStorage.user
    }
    getUser(){
        var user = JSON.parse(localStorage.getItem("user"));
        return user;
    }
    getToken () {
        var user = JSON.parse(localStorage.getItem("user"));
        return user.token;
    }
    fakeLogin(userName, password) {
        return new Promise(function (resolve, reject) {
            let user = null;
            if (userName == "recorder" && password == "recorder") {
                user = {
                    username: "jimmysmells",
                    roles: { 117: "Recorder", 120: "Recorder", 121: "Recorder", 122: "Recorder", 123: "Recorder", 115: "Recorder", 124: "Recorder", 125: "Recorder" },
                    token: "123123"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }
            if (userName == "larry" && password == "lawrence") {
                user = {
                    username: "jimmysmells",
                    roles: { 117: "Admin", 120: "Admin", 121: "Admin", 122: "Admin", 123: "Admin", 115: "Admin", 124: "Admin", 125: "Admin" },
                    token: "123123"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }
            if (userName == "southmeadows" && password == "chess123") {
                user = {
                    username: "jimmysmells",
                    roles: { 125: "Basic" },
                    token: "123125"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }

            if (userName == "ddg" && password == "intel") {
                user = {
                    username: "jimmysmells",
                    roles: { 124: "Basic" },
                    token: "123123"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }
            if (userName == "chessgirl" && password == "fun") {
                user = {
                    username: "jimmysmells",
                    roles: { 117: "Basic", 120: "Basic", 121: "Basic", 122: "Basic", 123: "Basic" },
                    token: "123123"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }
            if (userName == "admin" && password == "admin") {
                user = {
                    username: "jimmysmells",
                    roles: { 117: "Admin", 120: "Admin", 121: "Admin", 122: "Admin", 123: "Admin", 125: "Admin" },
                    token: "123123"
                };
                localStorage.setItem("user", JSON.stringify(user));
            }

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                resolve(user);
            }else{
                reject("Username or password is invalid")
            }
        });

    }
}