const webpack = require("webpack");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// HtmlWebPackPlugin copies html template and adds css and js bundle
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const env = process.env.NODE_ENV;

const fileLoaderOptions = {
    emitFile: true,
    name (file) {
        if (env === 'development') {
            return '[path][name].[ext]'
        }
        return './assets/[name].[ext]'
    }
}

module.exports = {
    entry: path.join(__dirname, "src/index.js"), // application entrypoint 
    devServer: {
      historyApiFallback: true
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.[chunkhash].js" // chunkhash, for unique hash
    },
    module: {
        rules:[
            { //  2, Handles Javascript/ES6/React code 
                test: /\.(js|jsx)$/,
                loader: "babel-loader", 
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                    ],
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/, //Handles IMG file with .jpeg, .jpg, .png, and .gif
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                ...fileLoaderOptions
                            }
                        }
                ]
            },
            {
                test: /\.(svg)$/,  // Handles SVG file, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000000, // 1 megabyte, If SVG more than 1 MB, It creates as URL
                            fallback: 'file-loader',
                            ...fileLoaderOptions
                        }
                    }
                ]
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: ['babel-loader', 'eslint-loader']
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new ExtractTextPlugin("bundle.[chunkhash].css") 
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}