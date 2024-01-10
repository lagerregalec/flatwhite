const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Check if the current environment is development
const isDevelopment = process.env.NODE_ENV === 'development';

// Define an array to hold the list of plugins
const plugins = [
  new MiniCssExtractPlugin({
    filename: 'style.[hash].css',
  }),
  new HtmlWebpackPlugin({
    filename: 'default.hbs',
    title: 'Custom template using Handlebars',
    template: 'src/default.hbs',
    minify: false
  }),
  new CopyPlugin({
    patterns: [
      { from: "./package.json", to: "." }
    ],
    options: {
      concurrency: 100,
    },
  }),
];

// Add LiveReloadPlugin only in development
if (isDevelopment) {
  const LiveReloadPlugin = require('webpack-livereload-plugin');
  plugins.push(new LiveReloadPlugin({}));
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    clean: true,
  },
  watchOptions: {
    ignored: [path.resolve(__dirname, 'dist')],
  },
  module: {
    rules: [
      // ... (unchanged)
    ],
  },
  plugins: plugins,
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    hot: false,
  },
};
