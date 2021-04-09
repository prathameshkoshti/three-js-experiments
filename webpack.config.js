const path = require('path');

module.exports = {
    entry: {
        helloCube: './src/hello-cube/index.js',
        drawingLines: './src/drawing-lines/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development'
};