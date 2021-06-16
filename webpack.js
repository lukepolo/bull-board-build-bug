const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/index',
  target: 'node',
  devtool: 'hidden-source-map',
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 200
  },
  stats: {
    hash: false,
    chunks: false,
    modules: false,
    source: false,
    reasons: false,
    version: false,
    timings: false,
    children: false,
    publicPath: false,
    errorDetails: false
  },
  externals: [

  ],
  node: {
    __dirname: true,
    __filename: true
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  resolve: {
    symlinks: true,
    extensions: [
      '.js',
      '.node'
    ]
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: [
          {
            options: {
              name() {
                return "[name].[ext]";
              }
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(
        {
          parallel: true,
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true
          }
        }
      )
    ]
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          {
            from: path.join(__dirname, './node_modules/bullmq/dist'),
            to: path.join(__dirname, './dist/node_modules/bullmq/dist')
          },
        ]
      }
    )
  ],
  externalsPresets: {
    node: true,
  }
}