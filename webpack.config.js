// webpack.config.js
const path = require('path');

module.exports = {
    entry: './app.js',
    //entry: ['webpack/hot/dev-server', path.resolve(__dirname, './app.js')],
    output: {
      //  publicPath:'/dist', // 必须加publicPath
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        inline: true,
        port: 8099
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.(jpg|png|gif)/,
            use: "url-loader?limit=20000"
        }
        ],


    }

};
