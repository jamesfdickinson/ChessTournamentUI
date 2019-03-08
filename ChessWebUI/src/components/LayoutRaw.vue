<template>

  <div id="app">
    <slot></slot>
    
  </div>
  
</template>
<script>
export default {
  name: "LayoutRaw",
  props: {
    //msg: String
  },
  components: {}
};
</script>
<style>
    body {
      width: initial;
      max-width: inherit;
      height: initial;
      overflow: auto;
      margin: 0;
      padding: 0;
      position:initial;
    }
  </style>