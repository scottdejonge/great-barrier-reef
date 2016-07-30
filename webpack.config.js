var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './assets/index.js',
  },
  output: {
    path: __dirname + '/dist',
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
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [
          path.join(__dirname, 'assets'),
        ]
      }, 
      {
        test: /\.json$/,
        loader: 'raw-loader',
        include: path.join(__dirname, 'assets')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
        include: path.join(__dirname, 'assets')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?/,
        loader: 'url?limit=8000&name=[name].[ext]'
      }
    ],
  },
  postcss: function(webpack) {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      postcssImport({
        path: './assets/css/*.css',
        addDependencyTo: webpack
      }),
      precss
    ];
  }
};