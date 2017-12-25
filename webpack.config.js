module.exports = {
  entry: './app.js',

  output: {
    filename: 'build.js',
  },

  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue/,
        loader: 'vue-loader'
      }
    ]
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}