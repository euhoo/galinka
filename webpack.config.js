const path = require('path');

module.exports = {
    entry: './galinka.js',
    mode: 'development',
    output: {
        filename: 'galinka.min.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
}