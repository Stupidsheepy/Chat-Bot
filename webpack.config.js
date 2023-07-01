const webpack = require('webpack');

module.exports = {
    // 其他配置...
    entry: './index.js',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
            'process.env.URL': JSON.stringify(process.env.URL),
        }),
    ],
};