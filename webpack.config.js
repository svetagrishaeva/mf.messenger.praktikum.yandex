const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'messenger.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.html']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/, use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    devServer: {
        compress: true,
        port: 4000
    },
};