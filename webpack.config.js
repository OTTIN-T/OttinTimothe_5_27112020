const path = require('path');
const ExtractCss = require('Mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinification = require('optimize-css-assets-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// -const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
     mode: "development",
     watch: true,
     entry: {
          polyfill: "babel-polyfill",
          app: "./app.js",
          index: "./js/index.js",
          product: "./js/product.js",
          basket: "./js/basket.js",
          order: "./js/order.js"
     },
     output: {
          filename: "[name].bundle.js",
          path: path.resolve(__dirname, "dist")
     },
     module: {
          rules: [
               {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                         loader: "babel-loader",
                         options: {
                              presets: ["@babel/preset-env"]
                         },
                    }
               },
          ]
     },

     // optimization: {
     //      optimization: {
     //           minimize: true,
     //           minimizer: [new TerserPlugin()],
     //      },
     //      minimizer: [
     //           new TerserPlugin({
     //                cache: true,
     //                parallel: true,
     //                sourceMap: true, //Permet d'afficher la source en claire
     //                terserOptions: {
     //                     // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
     //                }
     //           }),
     //      ]
     // }
};