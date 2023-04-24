import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const paths = {
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	build: path.resolve(__dirname, 'build'),
	html: path.resolve(__dirname, 'public', 'index.html'),
	src: path.resolve(__dirname, 'src'),
}

export default () => {
	const typeScriptLoader: webpack.RuleSetRule = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}
	const styleLoader: webpack.RuleSetRule = {
		test: /\.s?css$/i,
		use:
			[
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: {
							auto:
								(resPath: string) =>
									Boolean(resPath.includes('.module.')),
							localIdentName:
								'[path][name]__[local]--[hash:base64:5]'
						},
					}
				},
				'sass-loader'
			],
	}

	const svgLoader: webpack.RuleSetRule = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	}

	const fileLoader: webpack.RuleSetRule = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			}
		]
	}

	const  babelLoader: webpack.RuleSetRule = {
		test: /\.(js|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			}
		}
	}

	return {
		mode: 'development',
		entry: paths.entry,
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true
		},
		plugins: [
			new webpack.ProgressPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				title: 'FUCKING WEBPACK IN DEVELOPMENT',
				template: paths.html
			}),
		],
		module: {
			rules: [
				babelLoader,
				typeScriptLoader,
				styleLoader,
				svgLoader,
				fileLoader,
			]
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			preferAbsolute: true,
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
			mainFiles: ['index'],
		},
		devtool: 'inline-source-map',
		devServer: {
			port: 3000,
			historyApiFallback: true,
			hot: true,
		},
		cache: false,
	}
}