const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './build');

function buildConfigs(configDirs) {
    return {
        mode: 'development',
        entry: configDirs.APP_DIR + '/index.js',
        output: {
            path: configDirs.BUILD_DIR,
            filename: 'main.js',
            publicPath: '/'
        },
        devServer: {
            contentBase: configDirs.BUILD_DIR,
            compress: true,
            port: 3000
        },
        module: {
            rules: [{
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: { minimize: true }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlPlugin({
                template: configDirs.APP_DIR + '/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
}
module.exports = buildConfigs;