const path = require('path');

module.exports = {
    entry: './galinka.js',
    mode: 'development',
    output: {
        library: 'galinka',
         path: path.resolve(__dirname, 'build'),
         filename: './galinka.js'
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