const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const { ak } = require('./src/key')

module.exports = {
  devServer: {
    port: 3000
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    },
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].ak = ak
      return args
    })
    config.plugin('NodePolyfillPlugin').use(NodePolyfillPlugin)
  },
}
