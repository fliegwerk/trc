import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import Server from 'webpack-dev-server';

import { getLogger, createCompiler } from '../utils';

const logger = getLogger('watch');

/**
 * Builds and serves a webpack compiled project.
 * It uses the webpack development server to compile and serve the built project sources.
 * Both the webpack compiler and development server can be configured
 * via configuration files.
 *
 * @param webpackConfig - the configuration file for the webpack compiler
 * used by the development server
 * @param devServerConfig - the configuration file the webpack development server
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
export function watch(
	webpackConfig: Configuration,
	devServerConfig: DevServerConfiguration
): void {
	const compiler = createCompiler(webpackConfig);
	const server = new Server(compiler, devServerConfig);
	server.listen(Number.parseInt(devServerConfig.port + ""), error => {
		if (error) {
			logger.error(
				`Looks like we're facing a teensy tine little error: ${error.message}`
			);
			logger.debug(error.stack);
		}

		logger.debug(
			`I'll be completely honest here: I have absolutely no idea when` +
				` this callback gets called, but... It's great that it is :P`
		);
	});
}
