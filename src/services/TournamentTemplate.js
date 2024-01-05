export default class TournamentTemplate {
    constructor() {
    }
    getTournamentTemplate(type) {
        var randomInviteCodeBasic =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);
        var randomInviteCodeRecorder =
            Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5);
        var randomInviteCodeAdmin =
            Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5);

        if (type === "Cribbage") {
            return {
                name: "",
                accessCodeBasic: null,
                accessCodeRecorder: randomInviteCodeRecorder,
                accessCodeAdmin: randomInviteCodeAdmin,
                details: "",
                faqContent: "",
                hidden: false,
                id: 0,
                image: "/images/icons/cribbage.png",
                isPublic: true,
                owner: null,
                teams: "",
                signUpText: "",
                type: "Cribbage",
                rounds: 5,
                pairing: "Swiss",
                gameRoomLink: "https://cardsjd.com/cribbageembedded/?room=[room]&name=[name]&email=[email]&id=[id]&spectate=[spectate]&avatar=[avatar]",
                autoAdvanceRounds: true,
                allowNotifications: true,
                allowRegistration: false,
                state: "setup",
                maxPlayers: 50,
                requireCheckIn: true,
                allowCheckIn: false,
                startDateTime: null,
                timerDateTime: null,
                video: "",
                status: "Setup",
                statusProgress: 0,
                round: 0,
                checkInDuration: 120,
                twitchProfile: "",
                winPoints: 2,
                tiePoints: 1,
                lossPoints: 0,
                allowMultiplePlayersPerLogin: false,
                autoOpenGame: true,
                sendPostEmail: true,
                allowChat: true
            };
        }
        if (type === "Chess") {
            return {
                name: "",
                accessCodeBasic: randomInviteCodeBasic,
                accessCodeRecorder: randomInviteCodeRecorder,
                accessCodeAdmin: randomInviteCodeAdmin,
                details: "",
                faqContent: "",
                hidden: false,
                id: 0,
                image: "/images/icons/chess_rook_white.png",
                isPublic: false,
                owner: null,
                teams: "",
                signUpText: "",
                type: "Chess",
                rounds: 5,
                pairing: "Swiss",
                gameRoomLink: null,
                autoAdvanceRounds: false,
                allowNotifications: true,
                allowRegistration: false,
                state: "setup",
                maxPlayers: 300,
                requireCheckIn: false,
                allowCheckIn: false,
                startDateTime: null,
                timerDateTime: null,
                video: "",
                status: "Setup",
                statusProgress: 0,
                round: 0,
                checkInDuration: 120,
                twitchProfile: "",
                winPoints: 1,
                tiePoints: 0.5,
                lossPoints: 0,
                allowMultiplePlayersPerLogin: true,
                autoOpenGame: false,
                sendPostEmail: true,
                allowChat: true
            };
        }

        //default
        return {
            name: "",
            accessCodeBasic: null,
            accessCodeRecorder: randomInviteCodeRecorder,
            accessCodeAdmin: randomInviteCodeAdmin,
            details: "",
            faqContent: "",
            hidden: false,
            id: 0,
            image: "/images/icons/trophy.png",
            isPublic: true,
            owner: null,
            teams: "",
            signUpText: "",
            type: "",
            rounds: 5,
            pairing: "Swiss",
            gameRoomLink: null,
            autoAdvanceRounds: false,
            allowNotifications: true,
            allowRegistration: false,
            state: "setup",
            maxPlayers: 50,
            requireCheckIn: false,
            allowCheckIn: false,
            startDateTime: null,
            timerDateTime: null,
            video: "",
            status: "Setup",
            statusProgress: 0,
            round: 0,
            checkInDuration: 120,
            twitchProfile: "",
            winPoints: 1,
            tiePoints: 0.5,
            lossPoints: 0,
            allowMultiplePlayersPerLogin: false,
            autoOpenGame: false,
            sendPostEmail: true,
            allowChat: true
        };
    }
}