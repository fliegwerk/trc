import webpack, { Configuration } from 'webpack';
import { getLogger } from '../logger';

const logger = getLogger('webpack-compiler');

export function createCompiler(webpackConfig: Configuration) {
	const compiler = webpack(webpackConfig);

	compiler.hooks.beforeCompile.tap('invalid', () => {
		logger.info('Compiling ...');
	});

	compiler.hooks.done.tap('done', stats => {
		const statsRes = stats.toJson({
			all: false,
			warnings: true,
			errors: true
		});

		// nice user output, so no usage of cli tool
		if (statsRes.errors.length > 0) {
			logger.error('Can not compile.');
			statsRes.errors.forEach(error => logger.debug(error.message));
		} else if (statsRes.warnings.length > 0) {
			logger.warn('Compiled with warnings.');
			statsRes.warnings.forEach(warning => logger.debug(warning.message));
		} else {
			logger.success('Successfully compiled.');
		}
	});

	return compiler;
}
