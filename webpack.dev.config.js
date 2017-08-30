const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');

module.exports = {
	entry: {
		main: './src/script/main.js',
		page1: './src/script/page1.js'
	},
	output: {
		path: path.join(__dirname,'dist'),
		filename: 'script/[name].js'
	},	
	devServer: {
	  contentBase: path.join(__dirname,"dist"),
	  port: 9000
	},
	plugins: [
		new htmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		})
	]
};