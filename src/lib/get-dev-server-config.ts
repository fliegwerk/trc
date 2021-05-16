import {Configuration} from "webpack-dev-server";

export function getDevServerConfig(): Configuration {
	return {
		// logging
		noInfo: true,
		stats: 'errors-only',
		clientLogLevel: 'silent',
		overlay: true,
		// server configuration
		bonjour: true,
		open: true,
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
