module.exports = {
    // presets: ['@vue/app'],
    // presets: ['@vue/babel-preset-app'], // 默认
    plugins: [
        ['@babel/plugin-syntax-dynamic-import'],
        ['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant'],
    ],
};
