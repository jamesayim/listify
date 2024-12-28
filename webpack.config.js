const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html", 
            template: './src/template.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "./src/about.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
    ],
};