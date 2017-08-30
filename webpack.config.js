var webpack = require('webpack');

module.exports = {
	entry: './src/browser.js',
	output: {
		path: __dirname,
		filename: 'dist/glance-json.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	],
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