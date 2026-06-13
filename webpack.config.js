import path from 'path'
import { fileURLToPath } from 'url' 

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';


import webpack from 'webpack';
import dotenv from 'dotenv';


const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// Needed because __dirname doesn't exist in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  entry: './src/app/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Use CSS and Style loaders to bundle CSS
      },
    ],
  },
  devServer: {
    watchFiles: ['src/**/*'],
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 9000,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin(envKeys), 
    new HtmlWebpackPlugin({
      template: './src/app/index.html' // professional: source HTML
    }),
    new CopyWebpackPlugin({
      patterns: [
       { from: 'public', to: 'public' } // copy everything from root public/ to dist/public/
      ]
    })
  ]
}