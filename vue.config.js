// vue.config.js
const fs = require('fs');
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  outputDir: 'www',
  publicPath: process.env.CORDOVA_PLATFORM ? '' : '/',
  productionSourceMap: true, // Enable source maps in production
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: process.env.NODE_ENV === 'production' ? {} : {

    host: 'localhost',
    port: 8080,
    https: {
      key: fs.readFileSync('./certs/example.com+5-key.pem'),
      cert: fs.readFileSync('./certs/example.com+5.pem'),
    }
  }
}
