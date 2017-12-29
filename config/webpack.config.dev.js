const path                     = require('path')
    , webpack                  = require('webpack')
    , HtmlWebpackPlugin        = require('html-webpack-plugin')
    , ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
    , DashboardPlugin          = require('webpack-dashboard/plugin')

const relativePath    = '..'
    , srcPath         = path.resolve(__dirname, relativePath, 'src')
    , indexHtmlPath   = path.resolve(srcPath, 'index.html')
    , faviconPath     = path.resolve(__dirname, relativePath, 'favicon.ico')
    , buildPath       = path.join(__dirname, relativePath, 'build')

module.exports = {
  devtool: 'eval',
  entry: [
    require.resolve('webpack-dev-server/client') + '?http://localhost:3000',
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
          { loader: 'postcss-loader', options: {
            plugins: [
              require('precss'),
              require('postcss-advanced-variables')({ variables: { // global css variables
                'color-light':      '#EFF0E5', // mintcream lol
                'color-light-mid':  '#889F77',
                'color-mid':        '#6A551F',
                'color-dark-mid':   '#466167',
                'color-dark':       '#2A290A',
                'transition':       'all .222s'
              }}),
              require('autoprefixer')
            ]
          }}
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
      {
        test: /\.sol$/,
        loader: 'truffle-solidity-loader'
      },
      // {
      //   test: /\.sol$/,
      //   use: {
      //     loader: 'truffle-contract-loader',
      //     options: {
      //       contracts_directory: './contracts'
      //     }
      //   }
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: indexHtmlPath,
      favicon: faviconPath
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/style.css',
      disable: false,
      allChunks: true
    }), // this means dist/css/style.css    
    new webpack.ProvidePlugin({
      'Web3': 'web3'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  ]
}
