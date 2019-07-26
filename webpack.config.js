const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './build');


const configDirs = {
    BUILD_DIR: BUILD_DIR,
    APP_DIR: APP_DIR
}

function buildConfig(env) {
    if (env === 'dev' || env === 'prod') {
        return require(`./config/webpack.${env}.js`)(configDirs);
    } else {
        console.log('Wrong env choise. Possible choices:"dev" or "prod" ');
    }
}

module.exports = buildConfig;