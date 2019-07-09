const webpack = require('webpack');
const packagejson = require("./package.json");
const path = require('path');
const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer =  require('webpack-dev-server');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 将css分离
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const pageFile = glob.sync('src/pages/**/view/**/*',{
    nodir: true
});
let config = {};
config.entries = getEntryAndChunk(pageFile).entries;
config.chunks = getEntryAndChunk(pageFile).chunks;
config.plugins = [
    // 抽取的公共库js
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor/vendor'],
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor/manifest'],
        minChunks: Infinity
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery",
        "window.jQuery": "jquery"
    }),
    // 将css抽离生成
    new ExtractTextPlugin({
        filename: (getPath) => {
            return getPath('[name].css').replace('commonScript','commonCss');
        }
    })
];

(config.chunks).forEach(function (item) {
	let strArray = item.split('/');
	let templateStr = strArray[strArray.length-1];

	let htmlChunk = ["vendor/manifest","vendor/vendor","commonScript/common"]
    htmlChunk.push(item);
    config.plugins.push(new htmlWebpackPlugin({
        template: './src/pages/'+templateStr+'/view/'+templateStr+'.html',
        filename: templateStr+'.html',
        chunks: htmlChunk,
        chunksSortMode: "manual"
    }));
});

module.exports = {
	entry: config.entries,
	output: {
		// path: path.join('F:\\Trunk2\\Trunk2Project\\javaWebTest\\WebContent','dist'),
		path: path.join(__dirname,'dist'),
		filename: '[name].[chunkhash:8].js'
	},
	plugins: config.plugins,
	module:{
		rules:[
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['latest']
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:[
					// {loader:'style-loader'},
					{
						loader:'css-loader',
						options: {
							importLoaders: 1, // 在cssloader之前还要有1个loader处理
							sourceMap: true
						}
					},
					{
						loader:'postcss-loader',
						options:{
							ident: 'postcss',
							sourceMap: true,
							plugins:[require("autoprefixer")("last 5 versions")]
						}
					}
				]
				})
			},
			{
				test: /\.scss$/,
				use:[
					{loader:'style-loader'},
					{
						loader:'css-loader',
						options:{
							sourceMap: true
						}
					},
					{
						loader:'postcss-loader',
						options:{
							sourceMap: true,
							plugins:[require("autoprefixer")("last 5 versions")]
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.html/,
				use: [{loader:'html-loader'}]
			},
			{
				test: /\.jpg|.jpeg|.gif|.png/,
				use: [{
					loader: "file-loader",
                    options : {
                       	name : '[path][name].[ext]',
                        context: './src',
                        publicPath: '/src' // dist是将来放到项目里的文件夹名字
					}
				}]
            }
		]
	},
	devServer: {
        /*proxy: {
            '/jeecg': 'http://localhost:8087'
        },*/
	    port: 8088,
	    //open: true
	}
};


function getEntryAndChunk(pageFile) {
	let backObj = {};
    let entries = {};
    let chunks = [];
    entries["vendor/vendor"] =  Object.keys(packagejson.dependencies); //获取生产环境依赖的库
    entries["commonScript/common"]= './src/commonScript/common.js';

    pageFile.forEach(function (item) {
        entries[(item.replace('src/','').replace('/view','')).replace(/\.html$/, '')] = (item.replace('src/','./src/').replace(/\.html$/, '')).replace('/view','/script');
        chunks.push((item.replace('src/','').replace('/view','')).replace(/\.html$/, ''));
    });
    backObj["entries"] = entries;
    backObj["chunks"] = chunks;
    return backObj;
}