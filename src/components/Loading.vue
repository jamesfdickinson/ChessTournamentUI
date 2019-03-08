
<script>
export default {
  name: 'LoadingScreen',
  methods: {
    async showModal() {
      const loading = await this.$ionic.loadingController.create({
        spinner: 'hide',
        duration: 5000,
        message: 'Please wait...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      loading.present();
    }
  }
};
</script>