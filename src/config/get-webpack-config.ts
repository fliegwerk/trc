import path from 'path';
import {
	Configuration,
	DefinePlugin,
	HotModuleReplacementPlugin
} from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { Paths } from '../model/paths';
import { ReactHtmlPlugin } from '../plugins/react-html-plugin';

export function getWebpackConfig(paths: Paths, isDev = true): Configuration {
	return {
		mode: isDev ? 'development' : 'production',
		bail: !isDev,
		entry: paths.srcEntryFile,
		output: {
			path: isDev ? undefined : paths.outDir,
			pathinfo: isDev,
			filename: isDev
				? 'static/js/bundle.js'
				: 'static/js/[name].[contenthash:8].js',
			chunkFilename: isDev
				? 'static/js/[name].chunk.js'
				: 'static/js/[name].[contenthash:8].chunk.js',
			publicPath: paths.publicUrl + '/',
			// this defaults to 'window', but by setting it to 'this' then
			// module chunks which are built will work in web workers as well.
			//globalObject: 'this',
			clean: true
		},
		optimization: {
			minimize: !isDev,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: { ecma: 2018 },
						compress: {
							ecma: 5,
							comparisons: false,
							inline: 2
						},
						mangle: {
							safari10: true
						},
						keep_classnames: true,
						keep_fnames: true,
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true
						},
						sourceMap: false
					}
				})
			],
			splitChunks: !isDev
				? {
						chunks: 'all',
						name: false
				  }
				: undefined,
			runtimeChunk: !isDev
				? {
						name: entrypoint => `runtime-${entrypoint.name}`
				  }
				: undefined
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js'],
			plugins: [PnpWebpackPlugin]
		},
		resolveLoader: {
			plugins: [PnpWebpackPlugin.moduleLoader(module)]
		},
		module: {
			rules: [
				{
					oneOf: [
						{
							test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
							loader: require.resolve('url-loader'),
							options: {
								limit: 10000,
								name: 'static/media/[name].[hash:8].[ext]'
							}
						},
						{
							test: /\.[tj]sx?$/,
							include: paths.srcDir,
							loader: require.resolve('ts-loader'),
							exclude: /node_modules/
						},
						{
							test: /\.s[ac]ss$/i,
							use: [
								// Creates `style` nodes from JS strings
								require.resolve('style-loader'),
								// Translates CSS into CommonJS
								require.resolve('css-loader'),
								// Compiles Sass to CSS
								require.resolve('sass-loader')
							]
						},
						{
							test: /\.css$/i,
							use: [
								require.resolve('style-loader'),
								require.resolve('css-loader')
							]
						},
						{
							loader: require.resolve('file-loader'),
							exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
							options: {
								name: 'static/media/[name].[hash:8].[ext]'
							}
						}
					]
				}
			]
		},
		devtool: 'inline-source-map',
		plugins: [
			new CopyPlugin({
				patterns: [
					{
						from: path.join(paths.publicDir, '**/*'),
						context: paths.publicDir,
						to: paths.outDir,
						globOptions: {
							ignore: paths.publicEntryFile
						}
					}
				]
			}),
			// generates a valid html index file for development server
			new HTMLWebpackPlugin({
				template: paths.publicEntryFile,
				inject: true
			}),
			new ReactHtmlPlugin(HTMLWebpackPlugin, {
				PUBLIC_URL: paths.publicUrl
			}),
			new DefinePlugin({
				NODE_ENV: isDev ? 'development' : 'production'
			}),
			new HotModuleReplacementPlugin()
		],
		devServer: {
			publicPath: paths.publicDir
		}
	};
}
