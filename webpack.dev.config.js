const webpack = require('webpack');
const packagejson = require("./package.json");
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
	entry: {
        vendor: Object.keys(packagejson.dependencies), //获取生产环境依赖的库
        common: './src/script/common/common.js',
		index: './src/script/index/index.js',
		page1: './src/script/page1/page1.js',
	},
	output: {
		// path: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent','dist'),
		path: path.join(__dirname,'dist'),
		filename: 'script/[name].[chunkhash:8].js'
	},
	plugins: [
		// 抽取的公共库js
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        }),
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			alwaysWriteToDisk: true,
			devServer: false
		}),
		new HtmlWebpackHarddiskPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        })
	],
	devServer: {
	  // contentBase: path.join(__dirname,'dist'),
	  // contentBase: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent',"dist"),
	  // contentBase: path.join('F:\\Trunk2\\Trunk2Project\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\javaWebTest',"dist"),
	  port: 8088
	}
};