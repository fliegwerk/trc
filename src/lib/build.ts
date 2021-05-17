import { Configuration } from 'webpack';
import { getLogger, createCompiler } from '../utils';

const logger = getLogger('build');

/**
 * Builds project source files with webpack via a given configuration file.
 * @param webpackConfig - the configuration file for the webpack compiler
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
export function build(webpackConfig: Configuration): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const compiler = createCompiler(webpackConfig);

		compiler.run((err, stats) => {
			logger.debug(stats.toString());

			compiler.close(err => {
				if (err) {
					logger.error('Cannot close compiler');
					logger.debug(err);
					reject(err);
				} else {
					resolve();
				}
			});
		});
	});
}
