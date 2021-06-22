const path = require('path')

module.exports = {
	mode: 'production',
	entry: './src/tcgdex.browser.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'tcgdex.browser.js',
		libraryTarget: 'umd',
		library: 'TCGdex',
		umdNamedDefine: true
	},
	resolve: {
		extensions: ['.ts']
	},
	optimization: {
		minimize: true
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: 'awesome-typescript-loader',
			exclude: /node_modules/,
			options: {
				sourceMap: false,
				declarationDir: false,
				target: 'ES2016'
			}
		}]
	}
}
