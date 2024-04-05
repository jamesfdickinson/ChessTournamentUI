import fetch from "@/services/fetch";
export default class Authorization {
    constructor() {
    }
    requestAccess(userName, tournamentId) {
        if (!userName) throw new Error("requestAccess: No username");

        return fetch.post(`authentication/RequestAccess/${userName}?tournament=${tournamentId}`)
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
    refreshAccess(userName, force) {
        if (!userName) throw new Error("requestAccess: No username");

        //trottle call to server
        let accessLastChecked = parseInt(localStorage.getItem("access-last-checked"));
        let maxAccessLastCheckedElapsed = 1000 * 60 * 60; //60 minutes
        let accessLastCheckedElapsed = Number.isInteger(accessLastChecked) ? (new Date() - new Date(accessLastChecked)) : 0;

        if (force || accessLastCheckedElapsed > maxAccessLastCheckedElapsed || accessLastCheckedElapsed === 0) {
            localStorage.setItem("access-last-checked", new Date().getTime());//update last checked

            return fetch.get(`authentication/roles/${userName}`)
                .then(response => {
                    var user = response.data;
                    localStorage.setItem("user", JSON.stringify(user));
                    return user;
                })
                .catch((error) => {
                    if (error.response) throw error.response.data || error.response.statusText;
                    throw error;
                });
        } else {
            return new Promise(function (resolve) {
                resolve(JSON.parse(localStorage.getItem("user")));
            });
        }
    }
    isPageAllowed(toPage, tournamentId, roles) {
        if (!roles) roles = [];

        //redirect to login page if not logged in and trying to access a restricted page
        const pagesCreate = ['TournamentCreate'];
        const authRequiredCreate = pagesCreate.includes(toPage);

        const pagesAdmin = ['Admin', 'RoundEditRaw'];
        const authRequiredAdmin = pagesAdmin.includes(toPage);

        const pagesRecorder = ['CheckIn', 'PlayerEdit', 'PlayerNew', 'TableEdit'];
        const authRequiredRecorder = pagesRecorder.includes(toPage);

        const pagesBasic = ['Players', 'Reports', 'Tournament', 'Tournament', 'SignUp', 'SignUpComplete', 'FAQ'];
        //const pagesBasic = [];
        const authRequiredBasic = pagesBasic.includes(toPage);

        //require
        const pagesNoAuthenticationRequired = ['UserCreate', 'Login', 'PasswordResetRequest', 'PasswordChange', 'ChatRoom', 'Home', 'Help', 'HelpHowToHost', 'TournamentOverview'];
        const noAuthRequired = pagesNoAuthenticationRequired.includes(toPage);
        if (noAuthRequired) {
            true;
        }

        //contains role "tournamentId-role".
        let superAdminRole = "0-SuperAdmin";
        let createRole = "0-Create";
        let adminRole = tournamentId + "-Admin";
        let recorderRole = tournamentId + "-Recorder";
        let basicRole = tournamentId + "-Basic";

        //check if has SuperAdmin role and allow access to all pages
        if ((roles.includes(superAdminRole))) {
            return true;
        }
        //check if has SuperAdmin role for tournament
        if (authRequiredCreate && !(roles.includes(createRole))) {
            return false;
        }

        //check if has Admin role for tournament
        if (authRequiredAdmin && !(roles.includes(adminRole))) {
            return false;
        }
        //check if has Recorder role for tournament
        if (authRequiredRecorder && !(roles.includes(adminRole) || roles.includes(recorderRole))) {
            return false;
        }
        //check if has Basic role for tournament
        if (authRequiredBasic && !(roles.includes(adminRole) || roles.includes(recorderRole) || roles.includes(basicRole))) {
            return false;
        }

        return true;

    }
    inviteCode(code, userName, tournamentId) {
        return fetch.post(`accesscode`, { code: code, userName: userName, tournamentId: parseInt(tournamentId) })
            .then(response => {
                var user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            })
            .catch((error) => {
                if (error.response) throw error.response.data;
                throw error;
            });
    }
    fakeInviteCode(user, code, tournamentId) {
        return new Promise(function (resolve, reject) {
            if (code !== "123") reject("Invalid access code");

            var newRole = tournamentId + "-Basic";
            //add rule if not there
            if (user.roles.indexOf(newRole) === -1) {
                user.roles.push(newRole);
                //save
                localStorage.setItem("user", JSON.stringify(user));
            }
            resolve(true);
        }.bind(this));
    }

}