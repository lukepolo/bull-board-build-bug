const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: "./src/index",
  target: "node",
  externals: [],
  node: {
    __dirname: true,
    __filename: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true,
          keep_classnames: true,
        },
      }),
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "./node_modules/bullmq/dist"),
          to: path.join(__dirname, "./dist/node_modules/bullmq/dist"),
        },
      ],
    }),
  ],
  externalsPresets: {
    node: true,
  },
};
