// vue.config.js
const fs = require('fs');
module.exports = {
    outputDir: 'www',
    publicPath:  process.env.CORDOVA_PLATFORM ? '' :'/',

    devServer: {
        https: {
          key: fs.readFileSync('./certs/example.com+5-key.pem'),
          cert: fs.readFileSync('./certs/example.com+5.pem'),
        }
      }
}
