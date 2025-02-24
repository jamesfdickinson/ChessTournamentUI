export default class TournamentTemplate {
    constructor() {
    }
    templateList() {
        const types = [
            {
            name: "Cribbage - onlnie",
            type: "CribbageOnline",
            image: "/images/icons/cribbage-online.png"
        }, {
            name: "Cribbage - in person",
            type: "CribbageInPerson",
            image: "/images/icons/cribbage-in-person.png"
        },
        {
            name: "Chess - in person",
            type: "ChessInPerson",
            image: "/images/icons/chess_rook_white.png"
        },
        ];
        return types;
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

        if (type === "CribbageInPerson") {
            return {
                name: "",
                accessCodeBasic: randomInviteCodeBasic,
                accessCodeRecorder: randomInviteCodeRecorder,
                accessCodeAdmin: randomInviteCodeAdmin,
                details: "",
                faqContent: "",
                hidden: false,
                id: 0,
                image: "/images/icons/cribbage-in-person.png",
                isPublic: false,
                owner: null,
                teams: "",
                signUpText: "",
                type: "Cribbage",
                rounds: 5,
                pairing: "Weights",
                gameRoomLink: null,
                autoAdvanceRounds: false,
                allowNotifications: true,
                allowRegistration: false,
                state: "setup",
                maxPlayers: 200,
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
                winPoints: 2,
                tiePoints: 1,
                lossPoints: 0,
                allowMultiplePlayersPerLogin: true,
                autoOpenGame: false,
                sendPostEmail: true,
                allowChat: true,
                pairingWeightScore: 80,
                pairingWeightTeam: 70,
                pairingWeightPlayed: 70,
                pairingWeightRating: 0,
                pairingWeightGrade: 10,
                pairingMaxGradeDifference: -1,
                pairingMaxScoreDifference: -1,
                pairingAbsolutePlayed: false,
                pairingAbsoluteTeam: false,
                autoStartTournament: false

            };
        }
        if (type === "CribbageOnline") {
            return {
                name: "",
                accessCodeBasic: null,
                accessCodeRecorder: randomInviteCodeRecorder,
                accessCodeAdmin: randomInviteCodeAdmin,
                details: "",
                faqContent: "",
                hidden: false,
                id: 0,
                image: "/images/icons/cribbage-online.png",
                isPublic: true,
                owner: null,
                teams: "",
                signUpText: "",
                type: "Cribbage",
                rounds: 5,
                pairing: "Weights",
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
                allowChat: true,
                pairingWeightScore: 80,
                pairingWeightTeam: 50,
                pairingWeightPlayed: 70,
                pairingWeightRating: 0,
                pairingWeightGrade: 10,
                pairingMaxGradeDifference: -1,
                pairingMaxScoreDifference: -1,
                pairingAbsolutePlayed: false,
                pairingAbsoluteTeam: false,
                autoStartTournament: false

            };
        }
        if (type === "ChessInPerson") {
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
                pairing: "Weights",
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
                allowChat: true,
                pairingWeightScore: 80,
                pairingWeightTeam: 50,
                pairingWeightPlayed: 70,
                pairingWeightRating: 0,
                pairingWeightGrade: 10,
                pairingMaxGradeDifference: -1,
                pairingMaxScoreDifference: -1,
                pairingAbsolutePlayed: false,
                pairingAbsoluteTeam: false,
                autoStartTournament: false

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
            allowChat: true,
            pairingWeightScore: 80,
            pairingWeightTeam: 50,
            pairingWeightPlayed: 70,
            pairingWeightRating: 0,
            pairingWeightGrade: 10,
            pairingMaxGradeDifference: -1,
            pairingMaxScoreDifference: -1,
            pairingAbsolutePlayed: false,
            pairingAbsoluteTeam: false,
            autoStartTournament: false
        };
    }
}