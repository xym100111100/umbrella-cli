// require('@babel/register');
const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const apiMocker = require('webpack-api-mocker');
const proxy = require('./proxy.config');

module.exports = {
    outputDir: 'dist',
    publicPath: '/umbrella-cli/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    }),
                ],
            },
        },
    },
    devServer: {
        port: 8083,
        before(app) {
            apiMocker(app, path.resolve('mock/index.js'));
        },
        proxy,
    },
};
