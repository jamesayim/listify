const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";
    
    return {
    mode: isProduction ? "production" : "development",
    entry: {
        landing: "./src/client/index.js",
        app: "./src/client/app.js",
    },
    output: {
        filename: isProduction ? "[name].[contenthash].bundle.js" : "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: "/listify/",
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [ isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
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
    devtool: isProduction ? false : "inline-source-map",
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
        isProduction && new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ].filter(Boolean),
}
};
