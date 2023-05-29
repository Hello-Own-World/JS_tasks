const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },
  target: 'web',
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  devServer: {
    port: '4000',
    static: ['../dist'],
    open: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
    hot: false,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              // postcssOptions: {
              //   plugins: () => [require('autoprefixer')],
              // },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
