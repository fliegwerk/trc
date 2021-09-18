import { Configuration } from 'webpack-dev-server';

/**
 * Returns the webpack development server configuration
 * which can be used in a webpack development server.
 *
 * @example
 * ```ts
 * import { getDevServerConfig, watch } from '@fliegwerk/trc';
 * import Server from 'webpack-dev-server';
 *
 * const paths = getPaths();
 * const config = getWebpackConfig(paths);
 * const devServerConfig = getDevServerConfig();
 *
 * watch(config, devServerConfig);
 * ```
 */
export function getDevServerConfig(): Configuration {
	return {
		// logging
		devMiddleware: {
			stats: 'errors-only',
			publicPath: '/',
			writeToDisk: false
		},
		client: {
			logging: 'none',
			overlay: true
		},
		// server configuration
		bonjour: true,
		open: process.env.BROWSER !== 'none',
		hot: true,
		port: 3000,
		static: {
			watch: true
		},
		headers: {
			'Powered-By': 'fliegwerk'
		}
	};
}
