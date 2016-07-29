var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: __dirname + '/webroot/dist',
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        },
        include: [
          path.join(__dirname, 'src'),
        ]
      }, 
      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?/,
        loader: 'url?limit=8000&name=[name].[ext]'
      }
    ],
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ];
  }
};