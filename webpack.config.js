/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

let entry;
let plugins;
let cssLoaderParams;
let cssLoaders;
let devtool;

if (PROD) {
  entry = [
    path.resolve(__dirname, 'src/index.jsx'),
  ];
  cssLoaderParams = [
    'modules',
    'importLoaders=1',
    'localIdentName=[hash:base64:5]'
  ].join('&');
  cssLoaders = ExtractTextPlugin.extract(
    'style-loader',
    `css-loader?${cssLoaderParams}!postcss-loader`
  );
  plugins = [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        drop_console: true,
        unused: true,
        evaluate: true,
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ];
} else {
  devtool = 'source-map';
  entry = [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.jsx')
  ];
  cssLoaderParams = [
    'modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&');
  cssLoaders = `style-loader!css-loader?${cssLoaderParams}!postcss-loader`;
  plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      devServer: 3000
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = {
  devtool,
  entry: {
    bundle: entry
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: PROD ? '[name].[chunkhash].js' : '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: cssLoaders
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss() {
    return [
      require('postcss-import')({
        glob: true,
        onImport: function onImport(files) {
          files.forEach(this.addDependency);
        }.bind(this)
      }),
      require('autoprefixer')({
        browsers: ['last 2 versions', 'IE > 8']
      }),
      require('postcss-reporter')({
        clearMessages: true
      })
    ];
  },
  plugins
};
