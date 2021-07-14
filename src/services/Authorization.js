import fetch from "@/services/fetch";
export default class Authorization {
    constructor() {
    }
    requestAccess(userName, tournamentId) {
        if (!userName) {
            var user = this.getUser() || {};
            userName = user.userName;
        }
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
    refreshAccess(userName) {
        if (!userName) {
            var user = this.getUser() || {};
            userName = user.userName;
        }
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
    }
    isPageAllowed(toPage,tournamentId, roles) {
        if(!roles) roles = [];
        //redirect to login page if not logged in and trying to access a restricted page
        const pagesSuperAdmin = ['TournamentCreate'];
        const authRequiredSuperAdmin = pagesSuperAdmin.includes(toPage);
        
        const pagesAdmin = ['Admin','RoundEditRaw'];
        const authRequiredAdmin = pagesAdmin.includes(toPage);

        const pagesRecorder = ['CheckIn', 'PlayerEdit', 'PlayerNew', 'TableEdit'];
        const authRequiredRecorder = pagesRecorder.includes(toPage);

        const pagesBasic = ['Players', 'Reports', 'Tournament', 'Tournament', 'SignUp', 'SignUpComplete', 'FAQ'];
        //const pagesBasic = [];
        let authRequiredBasic = pagesBasic.includes(toPage);


        //contains role "tournamentId-role".
        //let superAdminRole = "0-SuperAdmin"; 
        let superAdminRole = "0-Create"; 
        let adminRole = tournamentId + "-Admin";
        let recorderRole = tournamentId + "-Recorder";
        let basicRole = tournamentId + "-Basic";

        //check if has SuperAdmin role for tournament
        if (authRequiredSuperAdmin && !(roles.includes(superAdminRole))) {
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
    inviteCode(code,userName, tournamentId) {
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
    fakeInviteCode(code, tournamentId) {
        return new Promise(function (resolve, reject) {
            if (code !== "123") reject("Invalid access code");

            var newRole = tournamentId + "-Basic";
            var user = this.getUser();
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