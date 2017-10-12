var path              = require('path')
var autoprefixer      = require('autoprefixer')
var webpack           = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var precss            = require('precss')

// TODO: hide this behind a flag and eliminate dead code on eject.
// This shouldn't be exposed to the user.
var isInNodeModules = path.basename(path.resolve(path.join(__dirname, '..', '..'))) === 'node_modules'
var relativePath    = isInNodeModules ? '../../..' : '..'
var isInDebugMode   = process.argv.some(arg =>
  arg.indexOf('--debug-template') > -1
)

if (isInDebugMode) {
  relativePath = '../template'
}

var srcPath         = path.resolve(__dirname, relativePath, 'src')
var nodeModulesPath = path.join(__dirname, '..', 'node_modules')
var indexHtmlPath   = path.resolve(__dirname, relativePath, 'index.html')
var faviconPath     = path.resolve(__dirname, relativePath, 'favicon.ico')
var buildPath       = path.join(__dirname, isInNodeModules ? '../../..' : '..', 'build')

var provided = {
  'Web3': 'web3'
}

console.log(path.join(srcPath, 'index'))

module.exports = {
  devtool: 'eval',
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost:3000',
    require.resolve('webpack/hot/dev-server'),
    path.join(srcPath, 'index')
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: buildPath,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    // root: srcPath,
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
          { loader: 'css-loader', options: { importLoaders: 1 } }, //  interprets @import and url() like import/require() and will resolve them.
          'postcss-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.sol/,
        loader: 'truffle-solidity-loader'
      }
    ],

    // loaders: [
    //   {
    //     test: /\.js$/,
    //     include: srcPath,
    //     loader: 'babel',
    //     query: require('./babel.dev')
    //   },
    //   {
    //     test: /\.css$/,
    //     include: srcPath,
    //     loader: 'style!css!postcss'
    //   },
    //   {
    //     test: /\.json$/,
    //     loader: 'json'
    //   },
    //   {
    //     test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    //     loader: 'file'
    //   },
    //   {
    //     test: /\.(mp4|webm)$/,
    //     loader: 'url?limit=10000'
    //   },
    //   {
    //     test: /\.sol/,
    //     loader: 'truffle-solidity'
    //   }
    // ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      favicon: faviconPath
    }),
    new webpack.ProvidePlugin(provided),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
