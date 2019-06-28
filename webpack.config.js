const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path=require('path');
const webpack=require('webpack');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback:'style-loader',
    use:['css-loader','sass-loader']
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        "app.bundle":'./src/app.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].[chunkhash].js'
    },

    devServer: {
        port:9000,
        open:true,
        hot:true
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        minify: {
            collapseWhitespace: true,
        },
        hash: true,
    }),
        new ExtractTextPlugin({
            filename:'style.css',
            disable:!isProd
        }),
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.jsx$/,loader:'babel-loader',exclude:/node_modules/},
            {test:/\.pug$/,loader:['raw-loader','pug-html-loader']},
            {test:/\.(gif|png|jpe?g|svg)$/i,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                },{
                        loader:'image-webpack-loader',
                    options:{
                            bypassOnDebug:true,
                    }
                }]},
            {test:/\.html$/,
                use:[{
                    loader:'html=loader',
                    options:{
                        minimize:true
                    }
                }]
            }
        ]
    }
};

