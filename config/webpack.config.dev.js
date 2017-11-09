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

// console.log('le nig', indexHtmlPath)
// console.log('le build path', buildPath)
// console.log(process.env.NODE_ENV)

// console.log()
// console.log('You can now serve it with any static server, for example:')
// console.log('  cd build')
// console.log('  npm install -g http-server')
// console.log('  hs')
// console.log('   http://localhost:8080')
// console.log()
// console.log('The bundle is optimized and ready to be deployed to production.')

const provided = {
  'Web3': 'web3'
}

module.exports = {
  devtool: 'eval',
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost.kors.local:3000',
    require.resolve('webpack/hot/dev-server'),
    path.join(srcPath, '/')
  ],
  output: {
    path: buildPath, // not used in dev but WebpackDevServer crashes without it:
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
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
      favicon: faviconPath
    }),
    new ExtractTextWebpackPlugin({ filename: 'css/style.css', disable: false, allChunks: true }), // this means dist/css/style.css    
    new webpack.ProvidePlugin(provided),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ]
}