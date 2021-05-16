import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import Server from 'webpack-dev-server';

import { getLogger } from '../logger';
import { getDevServerConfig } from './get-dev-server-config';
import { createCompiler } from './create-compiler';

const logger = getLogger('watch');

export function watch(
	webpackConfig: Configuration,
	devServerConfig: DevServerConfiguration
) {
	const compiler = createCompiler(webpackConfig);
	const server = new Server(compiler, getDevServerConfig());
	server.listen(devServerConfig.port, error => {
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
