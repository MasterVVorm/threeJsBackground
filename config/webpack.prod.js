const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function buildConfigs(configDirs) {
    return {
        mode: 'production',
        entry: configDirs.APP_DIR + '/index.js',
        output: {
            path: configDirs.BUILD_DIR,
            filename: 'main.js',
            publicPath: './'
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