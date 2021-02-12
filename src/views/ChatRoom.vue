<template>
  <layout-no-menu>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-icon
            name="arrow-round-back"
            size="large"
            @click="$router.go(-1)"
          ></ion-icon>
        </ion-buttons>
        <ion-title text-left>{{ id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      {{ state }}
      <template v-for="user of users">
        <div :key="user.id">
          <img :src="user.avatar" style="width: 40px" />
          <span>{{ user.name }}</span>
          <img
            @click="offer(user.connectionId)"
            style="width: 40px"
            src="/images/phone/videocall.png"
          />
        </div>
      </template>
      <!-- <ion-button @click="getStream()">getStream</ion-button> -->
      <video id="video" autoplay playsinline></video>

      <div id="controls" style="border: 1px solid black">
        <div id="videoGrid"></div>

        <div v-if="state == 'setup'"></div>
        <div v-if="state == 'ready'" style="text-align: center"></div>
        <div v-if="state == 'calling'">
          Calling...
          <div @click="close(call.id)">
            <img style="width: 60px" src="/images/phone/hangup.png" />
          </div>
        </div>
        <div v-if="state == 'ringing'">
          <div><img :src="call.avatar" /></div>
          <div>{{ call.name }} would like to video chat</div>
          <ion-button @click="acceptOffer(call.id, call.description)"
            >Anwser</ion-button
          >
          <ion-button @click="close(call.id)">Decline</ion-button>
        </div>
        <div v-if="state == 'connected'">
          Connected
          <div @click="close(call.id)">
            <img style="width: 60px" src="/images/phone/hangup.png" />
          </div>
        </div>
      </div>

      <!-- {{ users }} -->
    </ion-content>
  </layout-no-menu>
</template>

<script>
import RoomSocket from "@/services/RoomSocket";
import Authentication from "@/services/Authentication";

const roomSocket = new RoomSocket();
const authentication = new Authentication();

const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};
export default {
  name: "PlayGame",
  components: {},
  data() {
    this.peerConnections = {};
    let id = this.$route.params.id;
    let user = authentication.getUser();
    return {
      id: id,
      user: user,
      users: [],
      call: null,
      state: "setup",
      errors: [],
    };
  },
  methods: {
    loadData() {},
    populate(data) {
      this.users = data;
    },
    onUpdate(data) {
      this.populate(data);
    },
    addVideoStream(video, stream) {
      let videoGrid = document.querySelector("#videoGrid");
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    },
    getStream() {
      // Media contrains
      const constraints = {
        video: {
          width: { ideal: 200 },
          height: { ideal: 200 },
          //aspectRatio: { ideal: 1.7777777778 }
        },
        // Uncomment to enable audio
        audio: true,
      };

      return navigator.mediaDevices
        .getUserMedia(constraints)
        .catch((error) => console.error(error));
    },
    //  async getStream(){
    //       let stream = await navigator.mediaDevices
    //       .getUserMedia(constraints)
    //       .then((stream) => {
    //         video.srcObject = stream;
    //       })
    //       .catch((error) => console.error(error));
    //   },
    close(id) {
      let peerConnection = this.peerConnections[id];
      if (peerConnection) {
        peerConnection.close();
        this.peerConnections[id] = null;
      }
      this.state = "ready";
    },
    offer(id, userTo) {
      //set state
      this.state = "calling";
      const user = this.user;
      this.call = {
        id: id,
        description: null,
        name: userTo ? userTo.name : null,
        avatar: userTo ? userTo.avatar : null,
      };

      const peerConnection = new RTCPeerConnection(config);
      this.peerConnections[id] = peerConnection;
      const video = document.createElement("video");

      this.getStream().then((stream) => {
        const videoMy = document.querySelector("#video");
        videoMy.srcObject = stream;
        videoMy.muted = true;
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            roomSocket.candidate(id, user, event.candidate);
          }
        };
        peerConnection
          .createOffer()
          .then((sdp) => peerConnection.setLocalDescription(sdp))
          .then(() => {
            roomSocket.offer(id, user, peerConnection.localDescription);
          });
        peerConnection.ontrack = (event) => {
          // let video2 = document.querySelector("#video2");
          // video2.srcObject = event.streams[0];
          let stream = event.streams[0];

          this.addVideoStream(video, stream);
        };
        peerConnection.onsignalingstatechange = (event) => {
          let signalingState = event.target.signalingState;
          console.log("onsignalingstatechange", signalingState);
        };
        peerConnection.oniceconnectionstatechange = (event) => {
          let iceConnectionState = event.target.iceConnectionState;
          if (iceConnectionState == "disconnected") {
            this.state = "ready";
            console.log("Disconnected");
            video.remove();
          }
        };
      });
    },
    onOffer(id, user, description) {
      //set state
      this.state = "ringing";
      const peerConnection = new RTCPeerConnection(config);
      this.peerConnections[id] = peerConnection;
      //todo: show answer button
      this.call = {
        id: id,
        description: description,
        name: user.name,
        avatar: user.avatar,
      };
      //this.acceptOffer(id, description);
    },
    acceptOffer(id, description) {
      this.state = "connected";
      const user = this.user;

      const video = document.createElement("video");
      const peerConnection = this.peerConnections[id];
      peerConnection
        .setRemoteDescription(description)
        .then(() => this.getStream())
        .then((stream) => {
          const videoMy = document.querySelector("#video");
          videoMy.srcObject = stream;
          videoMy.muted = true;
          stream
            .getTracks()
            .forEach((track) => peerConnection.addTrack(track, stream));
        })
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          roomSocket.answer(id, user, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        //let video2 = document.querySelector("#video2");
        //video2.srcObject = event.streams[0];
        let stream = event.streams[0];
        this.addVideoStream(video, stream);
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          roomSocket.candidate(id, user, event.candidate);
        }
      };
      peerConnection.oniceconnectionstatechange = (event) => {
        let iceConnectionState = event.target.iceConnectionState;
        if (iceConnectionState == "disconnected") {
          this.state = "ready";
          console.log("Disconnected");
          video.remove();
        }
      };
    },
    onAnswer(id, from, description) {
      let peerConnection = this.peerConnections[id];
      this.state = "connected";
      if (peerConnection) peerConnection.setRemoteDescription(description);
    },
    onCandidate(id, from, candidate) {
      let peerConnection = this.peerConnections[id];
      if (peerConnection)
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    },
    onConnected() {
      this.state = "ready";

      let room = this.id;
      let name = "noName";
      let avatar = null;
      let user = this.user;
      if (user) {
        name = user.name;
        avatar = user.avatar;
      }
      roomSocket.joinRoom(room, name, avatar);
    },
  },
  computed: {},
  mounted() {
    this.loadData();
    roomSocket.onConnected = this.onConnected.bind(this);
    roomSocket.onUpdate = this.onUpdate.bind(this);
    roomSocket.onUpdate = this.onUpdate.bind(this);
    roomSocket.onOffer = this.onOffer.bind(this);
    roomSocket.onAnswer = this.onAnswer.bind(this);
    roomSocket.onCandidate = this.onCandidate.bind(this);

    roomSocket.connect(this.id);
  },
  created() {},
  beforeDestroy() {
    roomSocket.close();
  },
};
</script>
