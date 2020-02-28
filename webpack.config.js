const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (env, argv) => ({
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 7001,
  },
  entry: {
    app: ['@babel/polyfill', 'whatwg-fetch', './src/index.js'],
    vendor: ['@babel/polyfill', 'react', 'react-dom'],
  },
  resolve: {
    alias: {
      assets: `${__dirname}/src/assets`,
      components: `${__dirname}/src/components`,
      contexts: `${__dirname}/src/contexts`,
      js: `${__dirname}/src/js`,
      images: `${__dirname}/src/images`,
      pages: `${__dirname}/src/pages`,
      styles: `${__dirname}/src/styles`,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      }, {
        test: /\.(woff2?|eot|ttf|md|jpg|png)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              publicPath: argv.mode === 'development'
                ? '/'
                : 'https://gradedmetrics.com/',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].min.js',
    path: `${__dirname}/dist/compiled`,
    chunkFilename: '[name].min.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new FaviconsWebpackPlugin('./src/assets/images/favicon.png')
  ]
});
