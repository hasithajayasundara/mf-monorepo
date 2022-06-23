const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const pjson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/'
    },
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
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: pjson.dependencies
        })
    ]
};

module.exports = merge(commonConfig, devConfig);