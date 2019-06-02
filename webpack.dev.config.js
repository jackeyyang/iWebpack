const webpack = require('webpack');
const packagejson = require("./package.json");
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
	entry: {
        "vendor/vendor": Object.keys(packagejson.dependencies), //获取生产环境依赖的库
        "commonScript/common": './src/commonScript/common.js',
		"pages/index/index": './src/pages/index/script/index.js',
		"pages/login/login": './src/pages/login/script/login.js'
	},
	output: {
		// path: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent','dist'),
		path: path.join(__dirname,'dist'),
		filename: '[name].[chunkhash:8].js'
	},
	plugins: [
		// 抽取的公共库js
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor/vendor'],
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor/manifest'],
            minChunks: Infinity
        }),
		new htmlWebpackPlugin({
			template: './src/pages/index/view/index.html',
			filename: 'index.html',
			chunks: ["vendor/manifest","vendor/vendor","commonScript/common","pages/index/index"],
			chunksSortMode: "auto"
		}),
		new htmlWebpackPlugin({
			template: './src/pages/login/view/login.html',
			filename: 'login.html',
			chunks: ["vendor/manifest","vendor/vendor","commonScript/common","pages/login/login"],
			chunksSortMode: "auto"
		}),
		new HtmlWebpackHarddiskPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
	],
	module:{
		rules:[
			{
				test: /\.css$/,
				use:[
					{loader:'style-loader'},
					{
						loader:'css-loader',
						options: {
							importLoaders: 1 // 在cssloader之前还要有1个loader处理
						}
					},
					{
						loader:'postcss-loader',
						options:{
							plugins:[require("autoprefixer")("last 5 versions")]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use:[
					{loader:'style-loader'},
					{
						loader:'css-loader'
					},
					{
						loader:'postcss-loader',
						options:{
							plugins:[require("autoprefixer")("last 5 versions")]
						}
					},
					{
						loader: "sass-loader",
					}
				]
			}
		]
	},
	devServer: {
	  port: 8088
	}
};