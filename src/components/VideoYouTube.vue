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
    const youtubeChannelId = this.userName;
    let html = null;
      if (youtubeChannelId) {
        html = `<iframe 
          src="https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}"
          width="100%" 
          height="200"  
          ;autoplay=1" 
          title="" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
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

</style>


