'use strict';

const path = require('path');
const fromRoot = _ => path.resolve(__dirname, _);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: fromRoot('index.js'),
  output: {
    path: fromRoot('dist'),
    filename: 'bundle.web.js',
  },
  devServer: {
    static: {directory: fromRoot('dist')},
    devMiddleware: {publicPath: '/'},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    symlinks: false,
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: [
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.web.jsx',
      '.jsx',
    ],
  },
  plugins: [
    new (require('webpack').DefinePlugin)({
      process: {env: {}},
      __DEV__: 'true',
    }),
  ],
};
