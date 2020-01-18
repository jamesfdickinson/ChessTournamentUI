import fetch from "@/fetch.js";
export default class Authentication {
    constructor() {
    }
    register(user) {
        return fetch.put(`user`, user)
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })
            .catch((error)=> {
                if(error.response)  throw error.response.data;
                throw error;
            });
    }
    update(user) {
        return fetch.post(`user`, user)
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            });
    }
    login(username, password) {
        return fetch.post(`authentication`, { username, password })
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })            
            .catch((error)=> {
                if(error.response)  throw error.response.data;
                throw error;
            });
    }
    logout() {
        localStorage.clear("user");
    }
    loggedIn() {
        return !!localStorage.user
    }
    getUser() {
        let user
        try {
            user = JSON.parse(localStorage.getItem("user"));
        } catch{
            user = null;
        }
        return user;
    }
    getToken() {
        var user = JSON.parse(localStorage.getItem("user"));
        return user.token;
    }
    inviteCode(code, tournamentId) {
        var user = this.getUser() || {};
        var userId = user.id;
        return fetch.post(`accesscode`, { code: code, userId: userId, tournamentId: tournamentId })
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })
            .catch((error)=> {
                if(error.response)  throw error.response.data;
                throw error;
            });


        // return new Promise(function (resolve, reject) {
        //     if (code !== "123") reject("Invalid invite code");

        //     var newRole = tournamentId + "-Basic";
        //     var user = this.getUser();
        //     //add rule if not there
        //     if (user.roles.indexOf(newRole) === -1) {
        //         user.roles.push(newRole);
        //         //save
        //         localStorage.setItem("user", JSON.stringify(user));
        //     }
        //     resolve(true);
        // }.bind(this));
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
            } else {
                reject("Username or password is invalid")
            }
        });

    }
}