module.exports = {
    // presets: ['@vue/app'],
    // presets: ['@vue/babel-preset-app'], // 默认(目前显式设置了会与mocha和mock使用es6语法冲突)
    plugins: [
        ['@babel/plugin-syntax-dynamic-import'],
        ['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant'],
    ],
};
