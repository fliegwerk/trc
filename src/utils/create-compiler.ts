import webpack, { Compiler, Configuration } from 'webpack';
import { getLogger } from './logger';

const logger = getLogger('webpack-compiler');

/**
 * Creates a {@link webpack.Compiler}, based on the `webpackConfig`
 * @param webpackConfig - the webpack configuration
 *
 * @example
 * ```ts
 * const config = getWebpackConfig(paths, isDev);
 * const compiler = createCompiler(config);
 * compiler.run(() => {
 *     compiler.close();
 * });
 * ```
 */
export function createCompiler(webpackConfig: Configuration): Compiler {
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
			logger.error('Cannot compile.');
			statsRes.errors.forEach(error => logger.info(error.message));
		} else if (statsRes.warnings.length > 0) {
			logger.warn('Compiled with warnings.');
			statsRes.warnings.forEach(warning => logger.info(warning.message));
		} else {
			logger.success('Successfully compiled.');
		}
	});

	return compiler;
}
