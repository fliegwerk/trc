import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { Paths } from '../model/paths';

const publicUrl = '';

export function getWebpackConfig(paths: Paths): Configuration {
	return {
		mode: 'development',
		entry: {
			main: paths.srcEntryFile
		},
		output: {
			filename: 'bundle.js',
			path: paths.outDir,
			publicPath: publicUrl + '/'
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js']
		},
		module: {
			rules: [
				{
					test: /\.[tj]sx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader'
					]
				},
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				},
				{
					// for image files in public folder
					test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|svg)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: `[name].[hash].[ext]`
						}
					}
				}
			]
		},
		devtool: 'inline-source-map',
		plugins: [
			// generates a valid html index file for development server
			// new HTMLWebpackPlugin({
			// 	template: paths.publicEntryFile,
			// 	inject: true
			// }),
			new CopyPlugin({
				patterns: [
					{
						from: paths.publicDir,
						to: paths.outDir,
						force: true,
						globOptions: { ignore: 'index.html' }
					}
				]
			}),
			new HotModuleReplacementPlugin()
		],
		devServer: {
			publicPath: paths.publicDir
		}
	};
}
