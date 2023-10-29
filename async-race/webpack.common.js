const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const project = {
  title: 'async-race',
  lang: 'en',
}

const getTemplate = () => `<!DOCTYPE html>
<html lang="${project.lang}">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title}</title>
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
    <link rel="manifest" href="./site.webmanifest">
  </head>
  <body></body>
</html>`

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new StylelintPlugin({ extensions: ['scss'], fix: true }),
    new ESLintPlugin({ extensions: ['ts'] }),
    new HtmlWebpackPlugin({
      templateContent: getTemplate(),
      fileName: 'index.html',
      chunks: ['app'],
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/favicon', to: './' },
        { from: './src/assets/icons', to: './icons' },
      ],
    }),
  ],

  module: {
    rules: [
      { test: /\.ts?$/i, use: ['ts-loader'] },
      { test: /\.(css|s[ac]ss)$/i, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp|mp3)$/i, type: 'asset' },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [__dirname, 'node_modules'],
  },
}
