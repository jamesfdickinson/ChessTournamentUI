
<template>
  <div>
    <img
      :class="{ circleImage:true, grayed: disabled }"
      :style="{ 'background-color': stringToColour(name) }"
      :src="image ? image : '/images/avatars/agent.png'"
      onerror="this.src='/images/avatars/agent.png'"
    />
  </div>
</template>


<script>
export default {
  name: "AvatarIcon",
  props: {
    image: String,
    name: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      isLoaded: false,
    };
  },
  methods: {
    loaded() {
      this.isLoaded = true;
    },
    stringToColour(str) {
      if (!str) str = "";
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
    },
  },
};
</script>
<style scoped>
.circleImage {
  border-radius: 50%;
  overflow: hidden;
}
.grayed {
  filter: grayscale(0.9);
}

</style>
