const path = require("path");

const PATHS = {
  app: path.join(__dirname, 'app'),
  styles: path.join(__dirname, 'public', "stylesheets"),
  build: path.join(__dirname, 'public', 'javascripts')
};
module.exports = {
  context: path.join(__dirname, "app"),
  devtool: "eval-source-map",
  entry: {
    app: "./index.js"
  },
  output: {
    path: PATHS.build,
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel", "eslint-loader"],
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"],
        include: PATHS.app
      }
    ]
  }
};


// preLoaders: [
//   {
//     test: /\.js$/,
//     loader: "eslint-loader",
//     include: PATHS.app
//   },
// ],
