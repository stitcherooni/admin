const path = require("path");
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/robots.txt"),
          to: path.resolve(__dirname, "../build"),
        },
        {
          from: path.resolve(__dirname, "../public/favicon.ico"),
          to: path.resolve(__dirname, "../build"),
        },
        {
          from: path.resolve(__dirname, "../public/logo192.png"),
          to: path.resolve(__dirname, "../build"),
        },
        {
          from: path.resolve(__dirname, "../public/logo512.png"),
          to: path.resolve(__dirname, "../build"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: true
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      // new BundleAnalyzerPlugin(),
    ],
    splitChunks: {
      name: false,
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        }
      }
    },
  },
})
