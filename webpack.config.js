const path = require("path");
const webpack = require("webpack");

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, "app", "stylesheets"),
  styles: path.join(__dirname, 'public', "stylesheets"),
  build: path.join(__dirname, 'public', 'javascripts')
};
module.exports = {
  context: path.join(__dirname, "app"),
  entry: {
    app: "./index.js",
    vendor: ["./api/SC", "./vendor/offline"]
  },
  output: {
    path: PATHS.build,
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.style
      }
    ]
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loaders: ["eslint-loader"],
    //     include: PATHS.app,
    //     exclude: path.join(PATHS.app, "api")
    //   }
    // ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
