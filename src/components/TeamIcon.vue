
<template>
  <div v-show="title">
    <div v-show="isLoaded" class="teamIcon">
      <img :src="'images/teams/'+title+'.png'" @load="loaded"  />
    </div>
    <!-- <img v-if="image" v-bind:src="image" /> -->
    <div
      v-if="!isLoaded"
      class="initialBox"
      v-bind:style="{'background-color':stringToColour(title) }"
    >{{(title||"-").substring(0, 2)}}</div>
  </div>
</template>


<script>
export default {
  name: "TeamIcon",
  props: {
    title: String
  },
  data: function() {
    return {
      isLoaded: false
    };
  },
  methods: {
    loaded() {
      this.isLoaded = true;
    },
    stringToColour(str) {
      if(!str) str = "";
      var hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      var colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        value = Math.floor(value * 0.7); //make darker
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    }
  }
};
</script>
<style scoped>
.teamIcon {
  max-height: 25px;
  width: 26px;
  display: inline-block;
  text-align: center;
}
.teamIcon img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
.initialBox {
  min-width: 26px;

  font-weight: bold;
  background-color: #097123;
  color: white;
  padding: 3px 5px;
  display: inline-block;

  overflow: hidden;
  word-break: break-all;

  white-space: nowrap;
  text-align: center;
  border-radius: 5px;
}

.initialBox::first-letter {
  visibility: visible;
}
</style>
