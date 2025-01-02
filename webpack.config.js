const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ProvidePlugin } = webpack;

module.exports = {
    mode: 'development',
    stats: {
        errorDetails: true,
    },
    resolve: {
        fallback: {
            "child_process": false,
            process: require.resolve('process/browser'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            timers: require.resolve('timers-browserify'),
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer/'),
            vm: require.resolve('vm-browserify'),
            url: require.resolve('url/'),
            querystring: require.resolve('querystring-es3'),
            assert: require.resolve('assert/'),
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            http: require.resolve('stream-http'),
            fs: false,
            net: false,
            tls: false,
            util: require.resolve('util/'),
        },
    },
    entry: {
        landing: "./src/client/index.js",
        signup: "./src/client/signup.js",
        login: "./src/client/login.js",
        serverapp: "./src/server/server.js",
        connection: "./src/db/connection.js",
        route: "./src/server/routes/auth.js",
    },
    output: {
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    externals: {
        "aws-sdk": "commonjs aws-sdk",
    },      
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src",
                            },
                            {
                                tag: "link",
                                attribute: "href",
                                type: "src",
                            }
                        ],
                    },
                },
            },
            {
                test: /\.json$/,
                type: "json",
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
        watchFiles: ["./src/client/template.html", "./src/client/faq.html", "./src/client/about.html", "./src/client/tos.html", "./src/client/app.html", "./src/client/login.html", "./src/client/signup.html", "./src/client/privacy-policy"],
        static: "./dist",
        historyApiFallback: true,
    },
    plugins: [
        new ProvidePlugin({
            process: "process/browser"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html", 
            template: './src/client/template.html',
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "./src/client/about.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "faq.html",
            template: "./src/client/faq.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "tos.html",
            template: "./src/client/tos.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./src/client/app.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "login.html",
            template: "./src/client/login.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "signup.html",
            template: "./src/client/signup.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: "privacy-policy.html",
            template: "./src/client/privacy-policy.html",
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                useShortDoctype: false,
            },
        }),
    ],
};