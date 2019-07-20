const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function prodPlugin(plugin, argv) {
  return argv.mode === 'production' ? plugin : () => { };
}

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production' ? 'none' : 'source-map',
  mode: argv.mode === 'production' ? 'production' : 'development',
  entry: {
    script: ['./sources/js/index.js', './sources/scss/main.scss'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // CSS SASS SCSS
        test: /\.(css|sass|scss)$/,
        use: [
          argv.mode === 'development'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './config/',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    prodPlugin(
      new CleanWebpackPlugin({
        verbose: true,
      }),
      argv,
    ),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
    new HtmlWebPackPlugin({
      template: './sources/index.html',
      filename: 'index.html',
    }),
  ],
});
