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
			loader: 'ts-loader',
			exclude: /node_modules/,
			options: {
				compilerOptions: {
					sourceMap: false,
					declaration: false,
					declarationDir: null,
					target: 'ES2016'
				}
			}
		}]
	}
}
