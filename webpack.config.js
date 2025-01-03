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

const HtmlWebpackPlugins = htmlPages.map(page => {
    const name = page.replace('.html', '');
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./src/client/${page}`,
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            useShortDoctype: false,
        },
    });
});

module.exports = {
    mode: 'development',
    stats: {
        errorDetails: true,
    },
    // resolve: {
    //     fallback: {
    //         "child_process": false,
    //         "process": require.resolve('process/browser'),
    //         "zlib": require.resolve('browserify-zlib'),
    //         "stream": require.resolve('stream-browserify'),
    //         "timers": require.resolve('timers-browserify'),
    //         "crypto": require.resolve('crypto-browserify'),
    //         "buffer": require.resolve('buffer/'),
    //         "vm": require.resolve('vm-browserify'),
    //         "querystring": require.resolve('querystring-es3'),
    //         "assert": require.resolve('assert/'),
    //         "path": require.resolve('path-browserify'),
    //         "os": require.resolve('os-browserify/browser'),
    //         "http": require.resolve('stream-http'),
    //         "events": require.resolve('events/'),
    //         "https": require.resolve('https-browserify'),
    //         "module": false,
    //         "fs": false,
    //         "dns": false,
    //         "net": false,
    //         "tls": false,
    //         "util": require.resolve('util/'),
    //         "constants": require.resolve('constants-browserify'),
    //         "dgram": false,
    //         "url": require.resolve('url/'),
    //         "string_decoder": require.resolve('string_decoder/'),
    //         "querystring": require.resolve('querystring-es3/'),
    //     },
    // },
    entry: {
        landing: "./src/client/index.js",
        signup: "./src/client/signup.js",
        login: "./src/client/login.js",
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
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        ...HtmlWebpackPlugins,
    ],
};