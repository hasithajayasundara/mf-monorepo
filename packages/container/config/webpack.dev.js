const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: ['react', 'react-dom'], // pjson.dependecies here ??
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig);