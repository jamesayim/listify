const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPages = [
    "template.html",
    "about.html",
    "faq.html",
    "tos.html",
    "app.html",
    "login.html",
    "signup.html",
    "privacy-policy.html",
];

module.exports = {
    mode: 'development',
    entry: {
        landing: "./src/client/index.js",
        signup: "./src/client/signup.js",
        login: "./src/client/login.js",
        app: "./src/client/app.js",
    },
    output: {
        filename: '[name].bundle.js',
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
                generator: {
                    filename: "assets/[name][ext]",
                },
            },
        ]
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: [
            "./src/client/template.html",
            "./src/client/faq.html",
            "./src/client/about.html",
            "./src/client/tos.html",
            "./src/client/app.html",
            "./src/client/login.html",
            "./src/client/signup.html",
            "./src/client/privacy-policy.html"],
        static: {
            directory: path.join(__dirname, 'dist'),
            serveIndex: true,
            watch: true,
            publicPath: "/",
        },
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        ...htmlPages.map(page => {
            const name = page.replace('.html', '');
            return new HtmlWebpackPlugin({
              filename: `${name}.html`,
              template: `./src/client/${page}`,
              inject: 'body',
              minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
              },
            });
          }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};