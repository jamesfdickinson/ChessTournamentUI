<template>
  <div class="grid-container">
    <div ref="chatLog" class="chat-log">
      <template v-for="chatItem of visibleChatLog">
        <div :key="chatItem.id" class="chat-row">
          <!-- <div v-if="adminIds.includes(chatItem.userId)">
            <strong style="color: rgb(180, 0, 0)">{{ chatItem.name }}:</strong>
            <strong> {{ chatItem.message }} </strong>
          </div> -->
          <div v-if="fromAdmin(chatItem.userId)">

            <span v-if="isAdmin && showSeverity && chatItem.filterLevel" class="chat-severity-badge">{{ severityLabel(chatItem.filterLevel) }}</span>
            <span style="font-weight: bold;color: #3880ff"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }}:</span>
            <span :class="messageClass(chatItem)" style="font-weight:bold;"> {{ displayMessage(chatItem) }}</span>
          </div>
          <div v-else-if="isAdmin && !chatItem.tag">
            <span v-if="isAdmin && showSeverity && chatItem.filterLevel" class="chat-severity-badge">{{ severityLabel(chatItem.filterLevel) }}</span>
            <span style="font-weight: bold; color: green"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }}:</span>
            <span :class="messageClass(chatItem)"> {{ displayMessage(chatItem) }}</span>
          </div>
          <div v-else-if="chatItem.tag == 'system'">
            <span v-if="isAdmin && showSeverity && chatItem.filterLevel" class="chat-severity-badge">{{ severityLabel(chatItem.filterLevel) }}</span>
            <span style="font-weight: bold; color: #737373;opacity: 1;"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }}: </span>
            <span :class="messageClass(chatItem)" style=" opacity:1;">{{ displayMessage(chatItem) }}</span>
          </div>
          <div v-else-if="isAdmin && chatItem.tag == 'muted'">
            <span v-if="isAdmin && showSeverity && chatItem.filterLevel" class="chat-severity-badge">{{ severityLabel(chatItem.filterLevel) }}</span>
            <span style="font-weight: bold; color: green;opacity: 0.4;"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }} (Muted):</span>
            <span :class="messageClass(chatItem)" style=" opacity:0.4;">{{ displayMessage(chatItem) }}</span>
          </div>
          <div v-else-if="!isAdmin && !chatItem.tag">

            <span v-if="isAdmin && showSeverity && chatItem.filterLevel" class="chat-severity-badge">{{ severityLabel(chatItem.filterLevel) }}</span>
            <span style="font-weight: bold; color: green"
              @click="showUserChatOptions(chatItem.userId, chatItem.name)">{{ chatItem.name }}:</span>
            <span :class="messageClass(chatItem)"> {{ displayMessage(chatItem) }}</span>
          </div>
        </div>
      </template>
    </div>

    <div class="chat-button">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <!-- <ion-icon slot="start" name="text"></ion-icon> -->

          <ion-icon class="chat-icon-button" role="button" tabindex="0" aria-label="Chat settings" name="menu" slot="start"
            @click="toggleChatSettings" @keyup.enter="toggleChatSettings"></ion-icon>

          <ion-icon v-if="!isMuted" class="chat-icon-button" role="button" tabindex="0" aria-label="Mute chat audio"
            @click="mute()" @keyup.enter="mute()" name="volume-mute" color="medium" slot="start"></ion-icon>
          <ion-icon v-if="isMuted" class="chat-icon-button" role="button" tabindex="0" aria-label="Unmute chat audio"
            @click="unmute()" @keyup.enter="unmute()" name="volume-off" color="medium" slot="start"></ion-icon>


          <ion-input type="text" :value="message" @input="message = $event.target.value"
            placeholder="message..."></ion-input>

          <ion-button slot="end" type="submit">Send</ion-button>
        </ion-item>
        <ion-item v-if="showChatSettings">
          <ion-label>Filter Chat</ion-label>
          <ion-toggle slot="end" :checked="filterChat" @ionChange="setFilterChat($event.target.checked)"></ion-toggle>
        </ion-item>
        <ion-item v-if="showChatSettings">
          <ion-label>Mute Audio</ion-label>
          <ion-toggle slot="end" :checked="isMuted" @ionChange="setMuted($event.target.checked)"></ion-toggle>
        </ion-item>
        <ion-item v-if="showChatSettings && isAdmin">
          <ion-label>Show Severity</ion-label>
          <ion-toggle slot="end" :checked="showSeverity" @ionChange="setShowSeverity($event.target.checked)"></ion-toggle>
        </ion-item>
        <ion-item v-for="mutedUser in locallyMutedUsers" :key="`local-mute-${mutedUser.userId}`">
          <ion-label>Muted: {{ mutedUser.name }}</ion-label>
          <ion-button type="button" slot="end" fill="clear"
            @click="unmuteUserLocally(mutedUser.userId)">Unmute</ion-button>
        </ion-item>
        <ion-item v-if="showUserDetails">
          <p>{{ userDetails.userName }} </p>

          <ion-button v-if="userDetails.userId !== userId && !isLocallyMuted(userDetails.userId)" type="button"
            @click="muteUserLocally(userDetails.userId)">Mute For Me</ion-button>
          <ion-button v-if="userDetails.userId !== userId && isLocallyMuted(userDetails.userId)" type="button"
            @click="unmuteUserLocally(userDetails.userId)">Unmute For Me</ion-button>
          <ion-button v-if="isAdmin" type="button" @click="muteUser(userDetails.userId)">Mute For Everyone</ion-button>
          <ion-button v-if="isAdmin" type="button" @click="unmuteUser(userDetails.userId)">Unmute For Everyone</ion-button>
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
// import Filter from 'bad-words-jd';
// const filter = new Filter();
const LOCAL_MUTED_USERS_KEY = 'chatLocallyMutedUsers';
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
    adminIds: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tournamentId: [String, Number],
  },
  data: function () {
    this.soundAlert = new Howl({
      src: ["/audio/for-sure.mp3"],
    });
    this.soundAlertAdmin = new Howl({
      src: ["/audio/for-sure-f.mp3"],
    });
    let isMuted = localStorage.getItem('isMuted') == "true";
    const savedFilterChat = localStorage.getItem('filterChat');
    const savedFilterLevel = localStorage.getItem('filterChatLevel');
    const filterChat = savedFilterChat === null ? true : savedFilterChat === 'true';
    const parsedFilterLevel = Number(savedFilterLevel);
    const filterChatLevel = Number.isInteger(parsedFilterLevel) && parsedFilterLevel >= 1 && parsedFilterLevel <= 3
      ? parsedFilterLevel
      : 2;
    localStorage.setItem('filterChat', filterChat);
    localStorage.setItem('filterChatLevel', filterChatLevel);
    const showSeverity = localStorage.getItem('showSeverity') === 'true';
    let locallyMutedUserIds = [];
    try {
      const savedMutedUsers = JSON.parse(localStorage.getItem(LOCAL_MUTED_USERS_KEY));
      if (Array.isArray(savedMutedUsers)) locallyMutedUserIds = savedMutedUsers.filter(id => typeof id === 'string');
    } catch (error) {
      localStorage.removeItem(LOCAL_MUTED_USERS_KEY);
    }
    let isAdmin = this.adminIds.includes(this.userId);
    return {
      api: null,
      nextChatItemId: 1,
      message: "",
      isMuted: isMuted,
      filterChat: filterChat,
      filterChatLevel: filterChatLevel,
      showSeverity: showSeverity,
      locallyMutedUserIds: locallyMutedUserIds,
      showChatSettings: false,
      isAdmin: isAdmin,
      showUserDetails: false,
      userDetails: {
        userName: "",
        userId: "",
      },
    };
  },
  computed: {
    locallyMutedUsers() {
      if (!this.showChatSettings) return [];
      return this.locallyMutedUserIds.map(userId => {
        const chatItem = this.chatLog.find(item => item.userId === userId);
        return { userId, name: chatItem?.name || userId };
      });
    },
    visibleChatLog() {
      return this.chatLog.filter(item =>
        !this.isLocallyMuted(item.userId) &&
        (!this.filterChat || !this.filterChatLevel || item.userId === this.userId || item.filterLevel < this.filterChatLevel)
      );
    },
  },
  methods: {
    toggleChatSettings() {
      this.showChatSettings = !this.showChatSettings;
      this.hideUserChatOptions();
    },
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
      if (!userId || userId === 'system' || userId === this.userId) return;
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
    isLocallyMuted(userId) {
      return this.locallyMutedUserIds.includes(userId);
    },
    muteUserLocally(userId) {
      if (!userId || userId === this.userId || this.isLocallyMuted(userId)) return;
      this.locallyMutedUserIds.push(userId);
      this.saveLocallyMutedUsers();
      this.hideUserChatOptions();
    },
    unmuteUserLocally(userId) {
      this.locallyMutedUserIds = this.locallyMutedUserIds.filter(id => id !== userId);
      this.saveLocallyMutedUsers();
      this.hideUserChatOptions();
    },
    saveLocallyMutedUsers() {
      localStorage.setItem(LOCAL_MUTED_USERS_KEY, JSON.stringify(this.locallyMutedUserIds));
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
    setMuted(muted) {
      if (muted) {
        this.mute();
      } else {
        this.unmute();
      }
    },
    mute() {
      this.isMuted = true;
      localStorage.setItem('isMuted', true);
    },
    unmute() {
      this.isMuted = false;
      localStorage.setItem('isMuted', false);
    },
    setFilterChat(filterChat) {
      this.filterChat = filterChat;
      localStorage.setItem('filterChat', filterChat);
    },
    setShowSeverity(show) {
      this.showSeverity = show;
      localStorage.setItem('showSeverity', show);
    },
    displayMessage(chatItem) {
      return chatItem.message;
    },
    messageClass() {
      return 'chat-message';
    },
    severityLabel(level) {
      return ['', 'Low', 'Medium', 'High'][level] || '';
    },
    createChatItem(message) {
      const text = String(message.message || '');
      const severity = Number(message.severity);
      return {
        id: `chat-${this.nextChatItemId++}`,
        name: message.user,
        message: text,
        filterLevel: Number.isInteger(severity) && severity >= 0 && severity <= 3 ? severity : 0,
        userId: message.userId,
        tag: message.tag,
      };
    },
    onMessages(messages) {
      this.chatLog.splice(0, this.chatLog.length, ...messages.map(message => this.createChatItem(message)));
      this.$nextTick(() => this.scrollToEnd());
    },
    onMessage(user, message, userId, tag, severity = 0) {
      const shouldScroll = this.shouldScroll();
      const chatItem = this.createChatItem({ user, message, userId, tag, severity });
      this.chatLog.push(chatItem);

      if (!this.isMuted && userId !== "system") {
        if (this.fromAdmin(userId)) this.soundAlertAdmin.play();
        else this.soundAlert.play();
      }

      if (shouldScroll) this.$nextTick(() => this.scrollToEnd());
    },
    shouldScroll() {
      const messages = this.$refs.chatLog;
      if (!messages) return true;
      return messages.scrollHeight - messages.scrollTop <= messages.clientHeight + 60;
    },
    scrollToEnd() {
      const messages = this.$refs.chatLog;
      if (messages) messages.scrollTop = messages.scrollHeight;
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
  min-width: 0;
  min-height: 0;
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
  min-width: 0;
  min-height: 0;
  min-height: 100px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 10px 10px;
}

.chat-row {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.chat-button {
  grid-area: footer;
  padding: 0px 0px;
  max-height: 50vh;
  overflow-y: auto;
}

.chat-icon-button {
  cursor: pointer;
}

.chat-controls {
  display: inline-flex;
  align-items: center;
  gap: 0;
  font-size: 24px;
}

.chat-filter-level {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  white-space: nowrap;
}

.chat-filter-level label {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.chat-filter-level input {
  margin: 0;
}

.chat-message {
  padding: 1px 3px;
  border-radius: 2px;
}

.chat-severity-badge {
  font-size: 11px;
  font-weight: bold;
  margin-right: 2px;
  color: #8a1c1c;
}

.chat-users {
  grid-area: sidebar;
  padding: 10px 10px;

  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
