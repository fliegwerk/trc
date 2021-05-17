import path from 'path';
import {
	Configuration,
	DefinePlugin,
	HotModuleReplacementPlugin,
	RuleSetRule
} from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import { Paths } from '../model/paths';
import { ReactHtmlPlugin } from '../plugins/react-html-plugin';

/**
 * Builds and returns a webpack configuration for a webpack compiler
 * which compiles TypeScript React Code into browser runnable JavaScript.
 *
 * @param paths - the paths needed to build this configuration
 * (e.g. project root, output directory, ...)
 * @param isDev - when `true` webpack will build in development mode
 * and when `false` in production mode
 *
 * @example
 * ```ts
 * import { getWebpackConfig, getPaths, build } from '@fliegwerk/trc';
 *
 * const paths = getPaths();
 * const config = getWebpackConfig(paths);
 * build(config).then(() => console.log('Successfully built'));
 * ```
 */
export function getWebpackConfig(
	paths: Paths,
	isDev: boolean = true
): Configuration {
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
		optimization: getOptimization(isDev),
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
					oneOf: getLoaders(paths)
				}
			]
		},
		devtool: 'inline-source-map',
		plugins: getPlugins(paths, isDev),
		devServer: {
			publicPath: paths.publicDir
		}
	};
}

/**
 * Builds and returns a optimization configuration for a webpack configuration.
 * @param isDev - when `true` the code will not be minimized and not chunk split
 *
 * @example
 * ```ts
 * import { Configuration } from 'webpack;
 *
 * const isDev = true;
 *
 * const configuration: Configuration = {
 *     ...,
 *     optimization: getOptimization(isDev),
 *     ...
 * };
 * ```
 */
function getOptimization(isDev: boolean): Configuration['optimization'] {
	return {
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
	};
}

/**
 * Gets the loaders for the webpack configuration
 *
 * @param paths - a set of paths returned by {@link getPaths}.
 *
 * @returns the array of {@link RuleSetRule}s
 *
 * @example
 * ```ts
 * module: {
 * 		rules: [
 * 			{
 * 				oneOf: getLoaders(paths)
 * 			}
 * 		]
 * }
 * ```
 */
function getLoaders(paths: Paths): RuleSetRule[] {
	return [
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
			options: {
				compilerOptions: {
					"noEmit": false
				}
			},
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
			use: [require.resolve('style-loader'), require.resolve('css-loader')]
		},
		{
			loader: require.resolve('file-loader'),
			exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
			options: {
				name: 'static/media/[name].[hash:8].[ext]'
			}
		}
	];
}

/**
 * Builds and returns a plugin configuration for a webpack configuration.
 * @param paths - paths used by the webpack configuration are also important for plugins ;-)
 * @param isDev - when `true` React will be compiled in Development Mode
 * and when `false` in Production Mode
 *
 * @example
 * ```ts
 * import { Configuration } from 'webpack;
 * import { getPaths } from '@fliegwerk/trc';
 *
 * const isDev = true;
 * const paths = getPaths;
 *
 * const configuration: Configuration = {
 *     ...,
 *     plugins: getPlugins(paths, isDev),
 *     ...
 * };
 * ```
 */
function getPlugins(paths: Paths, isDev: boolean): Configuration['plugins'] {
	return [
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
	];
}
