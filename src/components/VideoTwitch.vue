<template>
  <div v-html="rawHTML">

  </div>
</template>

<script>


export default {
  name: "VideoTwitch",
  props: {
    userName: String,
  },
  data: function () {
    return {
      rawHTML: ""
    };
  },
  methods: {
  load(){
    const twitchName = this.userName;
    let html = null;
      if (twitchName) {
        html = `<iframe
              src="https://player.twitch.tv/?channel=${twitchName}&parent=tournamentjd.com&parent=localhost&muted=false"
              width="100%"
              height="200"
              allowfullscreen="true">
          </iframe>`;
      }
     this.rawHTML = html;
  }
  },
  updated() {},
  created() {
    this.load();
  },
  beforeDestroy() {
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


