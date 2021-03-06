var webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname,
		filename: 'dist/glance-json.js',
		libraryTarget: 'assign',
		library: 'glanceJSON',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
};