<template>
  <div class="grid-container">
    
    <div id="chat-log" class="chat-log">
      <template v-for="chatItem of chatLog">
        <div :key="chatItem.id">
          <strong style="color: green">{{ chatItem.name }}:</strong>
          {{ chatItem.message }}
        </div>
      </template>
    </div>

    <div class="chat-button">
      <form @submit.prevent="handleSubmit">
        <ion-item>
          <ion-icon slot="start" name="text"></ion-icon>
          <ion-input
            type="text"
            :value="message"
            @input="message = $event.target.value"
            placeholder="message..."
          ></ion-input>
          <ion-button slot="end" type="submit">Send</ion-button>
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
import { Howl } from "howler";

export default {
  name: "Chat",
  props: {
    chatLog: {
      type: Array,
      default: function () {
        return [];
      },
    },
    users: Array,
    channel: String,
    userName: String,
  },
  data: function () {
    this.soundAlert = new Howl({
      src: ["/audio/for-sure.mp3"],
    });
    return {
      api: null,
      message: "",
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

      signalR.send("SendMessage", channel, userName, message);
      this.$nextTick(() => this.scrollToEnd());
    },
    onMessages(messages) {
      //clear array
      this.chatLog.splice(0, this.chatLog.length);
      let chatLog = this.chatLog;
      for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        chatLog.push({
          name: message.user,
          message: message.message,
        });
      }
      this.$nextTick(() => this.scrollToEnd());
    },
    onMessage(user, message) {
      let chatLog = this.chatLog;
      chatLog.push({
        name: user,
        message: message,
      });

      this.soundAlert.play();

      let shouldScroll = this.shouldScroll();
      if (shouldScroll) this.$nextTick(() => this.scrollToEnd());
    },
    shouldScroll() {
      let messages = document.getElementById("chat-log");
      let shouldScroll = (messages.scrollHeight - Math.abs(messages.scrollTop)) <= (messages.clientHeight + 60);
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
  updated() {},
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

.grid-container > div {
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


