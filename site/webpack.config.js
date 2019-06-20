let path = require('path');

let conf = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    module: {
        rules:[
            {
               test: /\.css$/ ,
               use: [
                   'style-loader',
                   'css-loader'
               ]
            }
        ]
    }
}

module.exports = conf;