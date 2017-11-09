// var path = require('path');
// var precss            = require('precss')
// var autoprefixer = require('autoprefixer');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// // TODO: hide this behind a flag and eliminate dead code on eject.
// // This shouldn't be exposed to the user.
// var isInNodeModules = 'node_modules' ===
//   path.basename(path.resolve(path.join(__dirname, '..', '..')));
// var relativePath = isInNodeModules ? '../../..' : '..';
// // if (process.argv[2] === '--debug-template') {
// //   relativePath = '../template';
// // }
// var srcPath = path.resolve(__dirname, relativePath, 'src');
// var nodeModulesPath = path.join(__dirname, '..', 'node_modules');
// // var indexHtmlPath = path.resolve(__dirname, relativePath, 'index.html');
// const indexHtmlPath = path.resolve(srcPath, 'index.html')
// var faviconPath = path.resolve(__dirname, relativePath, 'favicon.ico');
// var buildPath = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'build');

// // console.log(buildPath)
// // console.log(nodeModulesPath, path.resolve('lib/webpack-loaders'))
// console.log('wowowow', path.join(indexHtmlPath, '..'))

const path                     = require('path')
    , autoprefixer             = require('autoprefixer')
    , webpack                  = require('webpack')
    , HtmlWebpackPlugin        = require('html-webpack-plugin')
    , ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
    , precss                   = require('precss')
    , DashboardPlugin          = require('webpack-dashboard/plugin')

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
// const isInNodeModules = path.basename(path.resolve(path.join(__dirname, '..', '..'))) === 'node_modules'
// let relativePath      = isInNodeModules ? '../../..' : '..'
let relativePath = '..'
// const isInDebugMode   = process.argv.some(arg => arg.indexOf('--debug-template') > -1)

// if(isInDebugMode) relativePath = '../template'

const srcPath         = path.resolve(__dirname, relativePath, 'src')
// const nodeModulesPath = path.join(__dirname, '..', 'node_modules')
const indexHtmlPath   = path.resolve(srcPath, 'index.html')
const faviconPath     = path.resolve(__dirname, relativePath, 'favicon.ico')
// const buildPath       = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'build')
// const buildPath       = path.join(__dirname, '..', 'build')
const buildPath       = path.join(__dirname, relativePath, 'build')

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: path.join(srcPath, 'index'),
  output: {
    path: buildPath,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/build/'
  },
  resolve: {
    modules: [
      srcPath,
      'node_modules'
    ],
    extensions: ['.js'],
    alias: {
      contracts: path.resolve('contracts')
    }
  },
  module: {

    // webpack 3
    rules: [
      {
        test: /\.js$/,
        include: srcPath,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          query: {
            configFile: path.join(__dirname, 'eslint.js'),
            useEslintrc: false
          }
        }]
      },
      {
        test: /\.js$/,
        include: srcPath,
        use: [{
          loader: 'babel-loader',
          query: require('./babel.dev')
        }]
      },
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          'style-loader', // Adds CSS to the DOM by injecting a <style> tag
          'css-loader', //  interprets @import and url() like import/require() and will resolve them.
          { loader: 'postcss-loader', options: { plugins: [precss, autoprefixer] } }
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // {
      //   test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      //   loader: 'file-loader'
      // },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      // {
      //   test: /\.sol$/,
      //   loader: 'truffle-solidity-loader'
      // },
      {
        test: /\.sol$/,
        use: {
          loader: 'truffle-contract-loader',
          options: {
            contracts_directory: './contracts'
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      filename: '../index.html', // the output index.html needs to be at the root so it can be rendered for github-pages
      favicon: faviconPath,
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
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      WEB3_RPC_LOCATION: '"' + process.env.WEB3_RPC_LOCATION + '"'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextWebpackPlugin('[name].[contenthash].css')
  ]
}