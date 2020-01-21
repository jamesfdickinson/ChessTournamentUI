
<template>
<div>
  <div
    class="initialBox"
    v-bind:style="{'background-color':stringToColour(title) }"
  >{{title.substring(0, 2)}}</div></div>
</template>


<script>
export default {
  name: "SchoolIcon",
  props: {
    title: String
  },
  data: function() {
    return {};
  },
  methods: {
    stringToColour(str) {
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
.initialBox {
  width: 32px;
 
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
