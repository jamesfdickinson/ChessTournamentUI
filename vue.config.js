// vue.config.js
module.exports = {
    outputDir: 'www',
    publicPath:  process.env.CORDOVA_PLATFORM ? '' :'/',

    devServer: {
        https: true
      }
}
