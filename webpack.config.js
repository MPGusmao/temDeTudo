const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
    filename: 'style.css',
    disable: isProduction
});

const basicConfig = {
    mode: isProduction ? 'production' : 'development',
    stats: { modules: false },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        clientLogLevel: 'info'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'client', 'src'),
            '@shared': path.join(__dirname, 'client', 'src', 'shared')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: extractSass.extract({ use: ['css-loader', 'sass-loader'], fallback: 'style-loader' })
                // exclude: /node_modules/,
            }
        ]
    }
};

const configs = [
    Object.assign({}, basicConfig, {
        name: 'User',
        entry: [ path.join(__dirname, 'client', 'src', 'app.js')],
        output: {
            publicPath: '',
            path: path.join(__dirname, 'client', 'dist'),
            filename: 'index.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './client/src/index.html',
                inject: 'body',
                title: 'lojatemdetudo',
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    })
];

module.exports = configs;
