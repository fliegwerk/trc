import { Configuration } from 'webpack';
import { getLogger } from '../logger';
import { createCompiler } from './create-compiler';

const logger = getLogger('build');

export function build(webpackConfig: Configuration): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const compiler = createCompiler(webpackConfig);

		compiler.compile((err, res) => {
			if (err) reject(err);

			logger.debug('Build callback called :D');
			logger.debug(res.getStats().toString());

			res.finish(() => {
				logger.info('Compilation finished');
				resolve();
			});
		});
	});
}
