const path = require("path");
const webpack = require("webpack");
// const glob = require("glob");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = process.env.NODE_ENV === "development";

// const PATHS = {
//   src: path.join(__dirname, "src"),
// };

module.exports = {
  mode: process.env.NODE_ENV,
  watch: dev,
  devtool: "source-map",
  entry: "./src/index.tsx",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        REACT_APP_MAPBOX_TOKEN: JSON.stringify(
          process.env.REACT_APP_MAPBOX_TOKEN
        ),
      },
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // chunkFilename: "bundle[name].js",
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: "styles",
  //         test: /\.css$/,
  //         chunks: "all",
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
};
