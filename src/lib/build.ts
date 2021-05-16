import { Configuration } from 'webpack';
import { getLogger, createCompiler } from '../utils';

const logger = getLogger('build');

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
