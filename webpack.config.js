const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/realization.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.css', '.json', '.html'],
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
    mode: 'development'
}