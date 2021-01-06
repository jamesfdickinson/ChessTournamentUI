import fetch from "@/services/fetch";
export default class CribbageServer {
    constructor() {
       this.baseURL = "https://cribbageserver.jimmyinteractive.com";
        //this.baseURL = "http://localhost";
    }
    users() {
        return fetch.get(`${this.baseURL}/users`)
        .then(response => {
            let users = response.data.users;
            return users;
        });
    }
  
}