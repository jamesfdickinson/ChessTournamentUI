<template>
  <div class="grid-container">
    <div id="chat-log" class="chat-log">
      <template v-for="chatItem of chatLog">
        <div :key="chatItem.id">
          <!-- <div v-if="adminIds.includes(chatItem.userId)">
            <strong style="color: rgb(180, 0, 0)">{{ chatItem.name }}:</strong>
            <strong> {{ chatItem.message }} </strong>
          </div> -->
          <div v-if="fromAdmin(chatItem.userId)">

            <span style="font-weight: bold;color: #3880ff">{{ chatItem.name }}:</span>
            <span style="font-weight:bold;"> {{ chatItem.message }}</span>
          </div>
          <div v-else-if="isAdmin && !chatItem.tag">
            <!-- <ion-icon v-if="isMuted"  slot="start" name="volume-off"></ion-icon> -->
            <span style="font-weight: bold; color: green"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }}:</span>
            {{ chatItem.message }}
          </div>
          <div v-else-if="isAdmin && chatItem.tag == 'muted'">
            <!-- <span  >&#10060;</span>  -->
            <span style="font-weight: bold; color: green;opacity: 0.4;"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }} (Muted):</span>
            <span style=" opacity:0.4;">{{ chatItem.message }}</span>
          </div>
          <div v-else-if="!isAdmin && !chatItem.tag">

            <span style="font-weight: bold; color: green">{{ chatItem.name }}:</span>
            {{ chatItem.message }}
          </div>
        </div>
      </template>
    </div>

    <div class="chat-button">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <!-- <ion-icon slot="start" name="text"></ion-icon> -->
          <ion-icon v-if="!isMuted" @click="mute()" slot="start" name="volume-mute"></ion-icon>
          <ion-icon v-if="isMuted" @click="unmute()" slot="start" name="volume-off"></ion-icon>
          <ion-input type="text" :value="message" @input="message = $event.target.value"
            placeholder="message..."></ion-input>

          <ion-button slot="end" type="submit">Send</ion-button>
        </ion-item>
        <ion-item v-if="showUserDetails">
          <p>{{ userDetails.userName }} </p>

          <ion-button type="button" @click="muteUser(userDetails.userId)">Mute</ion-button>
          <ion-button type="button" @click="unmuteUser(userDetails.userId)">UnMute</ion-button>
          <!-- <ion-button type="button">Clear All</ion-button> -->
          <a @click="hideUserChatOptions">[ Close ]</a>
        </ion-item>
      </form>
    </div>

    <!-- <div class="chat-users">
      <div>Jimmy</div>
      <div>BatMan</div>
      <div>John</div>
      <div>Sherry</div>
      <div>Tammy</div>
      <div>Mark</div>
      <div>Heidi</div>
      <div>Luke</div>
      <div>Andy</div>
      <div>Mark</div>
      <div>Heidi</div>
      <div>Luke</div>
      <div>Andy</div>
      <div>Heidi</div>
      <div>Luke</div>
      <div>Andy</div>
    </div>-->
  </div>
</template>

<script>
import SignalR from "@/services/SignalR.js";
const signalR = new SignalR();
import Authentication from "@/services/Authentication";
const authentication = new Authentication();
import TournamentAPI from "../services/TournamentAPI";
const tournamentAPI = new TournamentAPI();

import { Howl } from "howler";
import Filter from 'bad-words-jd';
const filter = new Filter();
export default {
  name: "Chat",
  props: {
    chatLog: {
      type: Array,
      default: function () {
        return [];
      },
    },
    channel: String,
    userName: String,
    userId: String,
    mutedIds: String,
    adminIds: Array,
    tournamentId: String,
  },
  data: function () {
    this.soundAlert = new Howl({
      src: ["/audio/for-sure.mp3"],
    });
    this.soundAlertAdmin = new Howl({
      src: ["/audio/for-sure-f.mp3"],
    });
    let isMuted = localStorage.getItem('isMuted') == "true";
    let isAdmin = this.adminIds.includes(this.userId);
    return {
      api: null,
      message: "",
      isMuted: isMuted,
      isAdmin: isAdmin,
      showUserDetails: false,
      userDetails: {
        userName: "",
        userId: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      let message = this.message;
      this.message = "";
      if (!message) return;

      this.send(message);
    },
    send(message) {
      var channel = this.channel.toString();
      let userName = this.userName || "Unknown";
      let userId = this.userId || "Unknown";

      signalR.send("SendMessage", channel, userName, message, userId);
      this.$nextTick(() => this.scrollToEnd());
    },

    showUserChatOptions(userId, userName) {
      this.showUserDetails = true;
      this.userDetails.userId = userId;
      this.userDetails.userName = userName;
    },
    fromAdmin(userId) {
      return this.adminIds.includes(userId);
    },
    hideUserChatOptions() {
      this.showUserDetails = false;
    },
    muteUser(userIdToMute) {
      const channel = this.channel.toString();
      const userName = this.userName || "Unknown";
      const userId = this.userId || "Unknown";
      const tournamentId = this.tournamentId || "";
      let message = `/mute ${userIdToMute}`;

      signalR.send("SendMessage", channel, userName, message, userId);
      this.hideUserChatOptions();

      //send to server to update user muted status
      tournamentAPI.muteUserForTournament(tournamentId, userIdToMute, true);
    },
    unmuteUser(userIdToUnMute) {
      const channel = this.channel.toString();
      const userName = this.userName || "Unknown";
      const userId = this.userId || "Unknown";
      const tournamentId = this.tournamentId || "";
      const message = `/unmute ${userIdToUnMute}`;

      signalR.send("SendMessage", channel, userName, message, userId);
      this.hideUserChatOptions();

      //send to server to update user muted status
      tournamentAPI.muteUserForTournament(tournamentId, userIdToUnMute, false);
    },
    isUserMuted(userId) {
      if (this.mutedIds?.includes(userId)) {
        return true;
      }
      return false;
    },
    mute() {
      this.isMuted = true;
      localStorage.setItem('isMuted', true);
    },
    unmute() {
      this.isMuted = false;
      localStorage.setItem('isMuted', false);
    },
    filterMessage(message) {
      const cleanMessage = filter.clean(message);
      return cleanMessage;
    },
    onMessages(messages) {
      const userIdLocal = this.userId;

      //clear array
      this.chatLog.splice(0, this.chatLog.length);
      let chatLog = this.chatLog;
      for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        let cleanMessage = message.message;
        //only filter other peoples messages
        if (userIdLocal != message.userId) {
          cleanMessage = this.filterMessage(cleanMessage);
        }
        chatLog.push({
          name: message.user,
          message: cleanMessage,
          userId: message.userId,
          tag: message.tag
        });
      }
      this.$nextTick(() => this.scrollToEnd());
    },
    onMessage(user, message, userId, tag) {
      const userIdLocal = this.userId;

      let chatLog = this.chatLog;
      let cleanMessage = message;
      //only filter other peoples messages
      if (userIdLocal != userId) {
        cleanMessage = this.filterMessage(cleanMessage);
      }
      chatLog.push({
        name: user,
        message: cleanMessage,
        userId: userId,
        tag: tag
      });
      if (!this.isMuted) {
        const isAdmin = this.fromAdmin(userId);
        if (isAdmin) {
          this.soundAlertAdmin.play();
        }
        else {
          this.soundAlert.play();
        }
      }

      let shouldScroll = this.shouldScroll();
      if (shouldScroll) this.$nextTick(() => this.scrollToEnd());
    },
    shouldScroll() {
      let messages = document.getElementById("chat-log");
      let shouldScroll =
        messages.scrollHeight - Math.abs(messages.scrollTop) <=
        messages.clientHeight + 60;
      return shouldScroll;
    },
    scrollToEnd() {
      var messages = document.getElementById("chat-log");
      messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    },
    loadDataSampleData() {
      for (let i = 0; i < 10; i++) {
        this.chatLog.push({
          id: i,
          name: "Jimmy",
          message:
            i + " At w3schools.com you will learn how to make a website.",
        });
      }
    },
    connectToChat() {
      var channel = this.channel.toString();
      let userName = this.userName || "Unknown";
      let token = authentication.getToken();

      signalR.connect(token, "chathub").then((r) => {
        console.log(r);
        signalR.onReceiveMessage = this.onMessage.bind(this);
        signalR.onReceiveMessages = this.onMessages.bind(this);
        signalR.onReconnect = this.onReconnect.bind(this);
        //signalR.send("SendMessage",tournamentId, userName,"mooo");
        signalR.send("JoinRoom", channel, userName);
      });
    },
    onReconnect() {
      var channel = this.channel.toString();
      let userName = this.userName || "Unknown";
      signalR.send("JoinRoom", channel, userName);
    },
    disconnectToChat() {
      signalR.close();
    },
  },
  updated() { },
  created() {
    //this.loadDataSampleData();
    this.connectToChat();
  },
  beforeDestroy() {
    this.disconnectToChat();
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  background-color: #2196f3;
  padding: 0px;
  height: 100%;
  display: grid;
  grid-template-columns: 90px auto;
  grid-template-rows: 1fr auto;
  grid-gap: 0px;
  grid-template-areas:
    "content content"
    "footer footer";
  /* grid-template-areas:
    "sidebar content"
    "sidebar content"
    "footer footer"; */
}

.grid-container>div {
  background-color: rgba(255, 255, 255, 0.8);
  xtext-align: left;
  xmargin: 5px 5px;
  xpadding: 10px 10px;
  xfont-size: 20px;
}

.chat-log {
  grid-area: content;
  min-height: 100px;
  overflow-y: scroll;
  padding: 10px 10px;
}

.chat-button {
  grid-area: footer;
  padding: 0px 0px;
}

.chat-users {
  grid-area: sidebar;
  padding: 10px 10px;

  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
