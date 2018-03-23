const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
	entry: {
		main: './src/script/main.js',
		page1: './src/script/page1.js'
	},
	output: {
		path: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent','dist'),
		filename: 'script/[name].[chunkhash:8].js'
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.jsp',
			alwaysWriteToDisk: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['common','manifest'],
			minChunks: Infinity
		}),
		new HtmlWebpackHarddiskPlugin()
	],
	devServer: {
	  contentBase: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent',"dist"),
	  // contentBase: path.join('F:\\Trunk2\\Trunk2Project\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\javaWebTest',"dist"),
	  port: 8088
	}
};