import { join } from 'path';

import { Paths } from '../model/paths';
import { getProjectDir } from './get-project-dir';
import { getSrcEntryFile } from './get-src-entry-file';
import { getPublicUrl } from './get-public-url';

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
