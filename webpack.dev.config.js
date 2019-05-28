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
		new htmlWebpackPlugin({
			template: './src/pages/index/view/index.html',
			filename: 'index.html',
			chunks: ["vendor/vendor","commonScript/common","pages/index/index"],
			chunksSortMode: "dependency"
		}),
		new htmlWebpackPlugin({
			template: './src/pages/login/view/login.html',
			filename: 'login.html',
			chunks: ["vendor/vendor","commonScript/common","pages/login/login"],
			chunksSortMode: "dependency"
		}),
		new HtmlWebpackHarddiskPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
	],
	devServer: {
	  port: 8088
	}
};