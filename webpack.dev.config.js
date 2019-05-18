const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
	entry: {
		common: ['./src/script/common/common.js'],
		main: './src/script/main.js',
		page1: './src/script/page1/page1.js'
	},
	output: {
		// path: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent','dist'),
		path: path.join(__dirname,'dist'),
		filename: 'script/[name].[chunkhash:8].js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			alwaysWriteToDisk: true,
			devServer: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['common','manifest'],
			minChunks: Infinity
		}),
		new HtmlWebpackHarddiskPlugin()
	],
	devServer: {
	  // contentBase: path.join(__dirname,'dist'),
	  // contentBase: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent',"dist"),
	  // contentBase: path.join('F:\\Trunk2\\Trunk2Project\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\javaWebTest',"dist"),
	  port: 8088
	}
};