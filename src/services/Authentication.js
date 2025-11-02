import fetch from "@/services/fetch";
export default class Authentication {
    constructor() {
    }
    register(user) {
        //get or create device id
        let deviceId = localStorage.getItem("device-id");
        if(!deviceId) {
            //random number 16 digits long
            deviceId = Math.floor(Math.random() * 1e16).toString();
            localStorage.setItem("device-id", deviceId);
        }
        user.deviceId = deviceId;
        return fetch.put(`authentication/register`, user)
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })
            .catch((error) => {
                if (error.response) throw error.response.data || error.response.statusText;
                throw error;
            });
    }
    changePassword(userName, oldPassword, newPassword, token) {
        var passwords = {
            userName: userName,
            oldPassword: oldPassword,
            newPassword: newPassword,
            token: token
        };
        return fetch.put(`authentication/changepassword`, passwords)
            .then(response => {
                return response;
            });
    }
    passwordReset(userName) {
        return fetch.post(`authentication/sendPasswordReset`, { userName: userName })
            .then(response => {
                return response;
            });
    }
    update(user) {
        return fetch.post(`authentication/UpdateUser`, user)
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            });
    }
    login(username, password) {
        return fetch.post(`authentication/login`, { username, password })
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })
            .catch((error) => {
                if (error.response) throw error.response.data || error.response.statusText;
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
        if(!user) return null;
        return user.token;
    }
    sendNotificationToken(currentToken, userName) {
        //get user Id
        if (!userName) {
            let user = this.getUser() || {};
            userName = user.userName;
        }
        console.log('Sending token to server...');
        let data = {
            "token": currentToken,
            "userName": userName
        };
        return fetch.post(`NotificationToken`, data);
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