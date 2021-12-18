const path = require("path");
const liveServer = require("live-server");
// const glob = require("glob");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dev = process.env.NODE_ENV === "development";

// const PATHS = {
//   src: path.join(__dirname, "src"),
// };

if (dev) {
  liveServer.start({
    root: "./",
    file: "index.html",
  });
}

module.exports = {
  mode: process.env.NODE_ENV,
  watch: dev,
  entry: "./src/index.tsx",
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "[name].css",
  //   }),
  //   new PurgecssPlugin({
  //     paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
  //   }),
  // ],
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
