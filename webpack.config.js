const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const UrlLoader = require('url-loader');
const fileloader = require('file-loader');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

module.exports = {
    entry: {main: './src/index.js'},
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'assets/js/[name].[chunkhash].js',
    },
    watch: true,
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' ,'sass-loader']

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.[contenthash].css',
        }),
        new WebpackMd5Hash(),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(jpe?g|png)/,
                options: {
                    quality:  75
                }
            }],
            overrideExtension: true,
            detailedLogs: true,
            strict: true
        })
    ]
};