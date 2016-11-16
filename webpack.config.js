const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  cache: true,
  debug: true,
  entry: __dirname + '/app/jsx/App.jsx',
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules|bower_components/,
      loader: 'babel-loader?presets[]=es2015&presets[]=react'
    // }]
    }, {
      test: /\.css$/,
      exclude: /node_modules|bower_components/,
      loader: 'file'
    }]
  },
  output: {
    filename: 'js/min.js',
    path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
