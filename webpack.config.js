const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  //mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    clean: true,
  },
  experiments: {
    
  },
  //watch: true,
  watchOptions: {
    ignored: [path.resolve(__dirname, 'dist')],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'],
      },
      {
        test: /\.(hbs)$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, 'src/default.hbs')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: '[path][name].[ext]'
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
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
    new LiveReloadPlugin({})
  ],
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    hot: false,
  },
};
