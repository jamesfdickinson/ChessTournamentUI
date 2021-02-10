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
      {{ room.name }}

      <ion-button @click="getStream()">getStream</ion-button>
      <template v-for="user of room.users">
        <div :key="user">
          <ion-button @click="offer(user)">Offer {{ user }} </ion-button>
        </div>
      </template>
      <video id="video" autoplay playsinline></video>

      <div id="videoGrid"></div>

      {{ room.users }}
    </ion-content>
  </layout-no-menu>
</template>

<script>
import RoomSocket from "@/services/RoomSocket";
const roomSocket = new RoomSocket();
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
    return {
      id: id,
      room: {},
      errors: [],
    };
  },
  methods: {
    loadData() {},
    populate(data) {
      this.room = data;
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
    offer(id) {
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
            roomSocket.candidate(id, event.candidate);
          }
        };
        peerConnection
          .createOffer()
          .then((sdp) => peerConnection.setLocalDescription(sdp))
          .then(() => {
            roomSocket.offer(id, peerConnection.localDescription);
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
            console.log("Disconnected");
            video.remove();
          }
        };
      });
    },
    onOffer(id, description) {
      const peerConnection = new RTCPeerConnection(config);
      this.peerConnections[id] = peerConnection;
       const video = document.createElement("video");
     
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
          roomSocket.answer(id, peerConnection.localDescription);
        });
      peerConnection.ontrack = (event) => {
        //let video2 = document.querySelector("#video2");
        //video2.srcObject = event.streams[0];
        let stream = event.streams[0];
        this.addVideoStream(video, stream);
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          roomSocket.candidate(id, event.candidate);
        }
      };
      peerConnection.oniceconnectionstatechange = (event) => {
        let iceConnectionState = event.target.iceConnectionState;
        if (iceConnectionState == "disconnected") {
          console.log("Disconnected");
          video.remove();
        }
      };
    },
    onAnswer(id, description) {
      this.peerConnections[id].setRemoteDescription(description);
    },
    onCandidate(id, candidate) {
      this.peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    },
  },
  computed: {},
  mounted() {
    this.loadData();
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
