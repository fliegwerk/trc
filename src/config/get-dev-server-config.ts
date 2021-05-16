import { Configuration } from 'webpack-dev-server';

/**
 * Returns the webpack development server configuration.
 */
export function getDevServerConfig(): Configuration {
	return {
		// logging
		noInfo: true,
		stats: 'errors-only',
		clientLogLevel: 'silent',
		overlay: true,
		// server configuration
		bonjour: true,
		open: !!process.env.BROWSER,
		hot: true,
		publicPath: '/',
		port: 3000,
		watchContentBase: true,
		headers: {
			'Powered-By': 'fliegwerk'
		},
		writeToDisk: false
	};
}
