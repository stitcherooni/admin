const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/[name].js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              name: '[hash]-[name].[ext]',
              outputPath: 'static/media',
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[hash]-[name].[ext]',
              outputPath: 'static/media',
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png)$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3001,
    open: true,
    historyApiFallback: true,
    proxy: {      
      '/api': {
        target: 'https://ptaeventsgateway.azurewebsites.net/api',
        secure: false,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    },
  },
};
