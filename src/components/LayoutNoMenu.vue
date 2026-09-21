<template>
  <div id="app">
    <ion-app id="page">
      <slot></slot>
    </ion-app>
  </div>
</template>
<script>
export default {
  name: "LayoutNoMenu",
  props: {
    //msg: String
  },
  components: {}
};
</script>