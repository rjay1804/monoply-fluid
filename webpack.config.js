/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        entry: {
            app: "./src/app.ts",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                      'file-loader',
                      {
                        loader: 'image-webpack-loader',
                        options: {
                          bypassOnDebug: true, // webpack@1.x
                          disable: true, // webpack@2.x and newer
                        },
                      },
                    ],
                },
                //{
                // test: /\.svg$/,
                // loader: 'svg-react-loader',
                // },
                // {
                //     test: /\.html$/i,
                //     loader: "html-loader",
                // },
            ],
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            library: "[name]",
            // https://github.com/webpack/webpack/issues/5767
            // https://github.com/webpack/webpack/issues/7939
            devtoolNamespace: "@fluid-example/sudoku",
            libraryTarget: "umd",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
        ],
        mode: "development",
        devtool: "inline-source-map",
    };
};
