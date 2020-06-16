import fetch from "@/fetch.js";
export default class Authorization {
    constructor() {
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
        const pagesAdmin = ['Admin'];
        const authRequiredAdmin = pagesAdmin.includes(toPage);

        const pagesRecorder = ['Registration', 'PlayerEdit', 'PlayerNew', 'TableEdit'];
        const authRequiredRecorder = pagesRecorder.includes(toPage);

        const pagesBasic = ['Players', 'Reports', 'Tournament', 'Tournament', 'SignUp', 'SignUpComplete', 'FAQ'];
        //const pagesBasic = [];
        const authRequiredBasic = pagesBasic.includes(toPage);


        //contains role "tournamentId-role".  
        let adminRole = tournamentId + "-Admin";
        let recorderRole = tournamentId + "-Recorder";
        let basicRole = tournamentId + "-Basic";

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

}