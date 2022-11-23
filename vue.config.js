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
  }
}
