var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
process.noDeprecation = true;
var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: 2,
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html') // Load a custom template
    }),
]

if (production) {
    plugins.push(
        new ExtractTextPlugin('libs/styles.[contenthash:6].css'),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })

    )
} else {
    plugins.push(
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            './src/index'
        ],
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: production ? 'libs/[name].[hash].js' : 'libs/[name].js',
        path: path.join(__dirname, 'build'),
        publicPath: production ? './' : '/',
        chunkFilename: production ? 'libs/[name].[hash].js' : 'libs/[name].js'
    },
    devtool: 'eval-source-map',
    plugins,
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules'
        ]
    },

    module: {
        rules: [{
            test: /\.js?$/,
            use: ['babel-loader'],
            exclude: /(node_modules)/
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true //css
                    }
                }, "sass-loader"]
            })
        }, {
            test: /\.less/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                      minimize: true,
                      modules: true,
                      importLoaders: 2,
                      sourceMap: true,
                      localIdentName: '[hash:base64:5]'
                    }
                }, "less-loader"]
            })
        }, {
            test: /\.(png|gif|md)$/,
            use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: ['url-loader?limit=10000&mimetype=images/svg+xml']
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
        }]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        inline: true,
        port: '8080',
        hot: true
    },
};