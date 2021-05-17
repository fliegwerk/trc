import { join } from 'path';

import { Paths } from '../model/paths';
import { getProjectDir } from './get-project-dir';
import { getSrcEntryFile } from './get-src-entry-file';
import { getPublicUrl } from './get-public-url';

/**
 * Returns a set of paths commonly required for creating a webpack configuration.
 *
 * Gets passed to {@link getWebpackConfig}.
 *
 * @returns the paths required for creating a webpack config
 *
 * @example
 * ```ts
 * const paths = getPaths();
 * const webpackConfig = createWebpackConfig(paths, isDev);
 * ```
 */
export function getPaths(): Paths {
	const projectDir = getProjectDir();
	const srcDir = join(projectDir, 'src');
	const publicDir = join(projectDir, 'public');

	return {
		projectDir,
		srcDir,
		srcEntryFile: getSrcEntryFile(srcDir),
		publicDir,
		publicEntryFile: join(publicDir, 'index.html'),
		publicUrl: getPublicUrl(projectDir),
		outDir: join(projectDir, 'build')
	};
}
