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
        watchFiles: ["./src/template.html", "./src/faq.html"],
        static: "./dist",
        historyApiFallback: true,
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
        new HtmlWebpackPlugin({
            filename: "faq.html",
            template: "./src/faq.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "tos.html",
            template: "./src/tos.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./src/app.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/login.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "signup.html",
            template: "./src/signup.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "privacy-policy.html",
            template: "./src/privacy-policy.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
    ],
};