const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
    target: 'electron-main',
    entry: {
        main: './src/main/index.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            { targets: 'maintained node versions' }
                        ],
                        '@babel/preset-typescript',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        '@babel/plugin-transform-async-to-generator',
                        '@babel/plugin-proposal-object-rest-spread'
                    ]
                }
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                loader: "file",
            },

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          URLSearchParams: ['url', 'URLSearchParams'],
          fetch: 'node-fetch',
        }),
        new ForkTsCheckerWebpackPlugin({
            reportFiles: ['src/main/**/*']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ]
});
