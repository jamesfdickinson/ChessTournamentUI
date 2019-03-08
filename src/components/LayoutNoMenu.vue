<template>
  <div id="app">
    <ion-app>
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