const path = require("path");
const webpack = require("webpack");

const PATHS = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'public', "stylesheets"),
  build: path.join(__dirname, 'public', 'javascripts')
};
module.exports = {
  context: path.join(__dirname, "app"),
  debug: true,
  devtool: "eval-source-map",
  entry: {
    app: "./index.js",
    vendor: ["./api/SC"]
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
        loaders: ["style", "css"],
        include: PATHS.app
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ["eslint-loader"],
        include: PATHS.app,
        exclude: path.join(PATHS.app, "api")
      }
    ]
  },
  plugins: [
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
  ]
};
