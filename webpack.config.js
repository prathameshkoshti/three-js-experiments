const path = require('path');

module.exports = {
    entry: {
        helloCube: './src/hello-cube/index.js',
        drawingLines: './src/drawing-lines/index.js',
        helloCubeExtended: './src/hello-cube-extended/index.js',
        geometryBox: './src/geometry-box/index.js',
        geometryCircle: './src/geometry-circle/index.js',
        geometryCone: './src/geometry-cone/index.js',
        geometryCylinder: './src/geometry-cylinder/index.js',
        geometryDodecahadron: './src/geometry-dodecahadron/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development'
};