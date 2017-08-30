const path = require('path');

module.exports = {
	entry: {
		main: './src/script/main.js',
		page1: './src/script/page1.js'
	},
	output: {
		path: path.resolve(__dirname,'./dist'),
		filename: 'script/[name].js'
	}
};