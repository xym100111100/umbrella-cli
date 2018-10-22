const path = require('path');
const apiMocker = require('webpack-api-mocker');
const proxy = require('./proxy.config');

module.exports = {
    outputDir: 'dist',
    baseUrl: '/damai-wxg/',
    devServer: {
        port: 8083,
        before(app) {
            apiMocker(app, path.resolve('mock/index.js'));
        },
        proxy,
    },
};
