import { join, relative } from 'path';
import { existsSync } from 'fs';

export function getSrcEntryFile(srcDir: string): string {
	const extensions = ['tsx', 'ts', 'js', 'jsx'];

	for (let filepath of extensions.map(ext => join(srcDir, `index.${ext}`))) {
		if (existsSync(filepath)) {
			return filepath;
		}
	}

	throw new Error(
		`Expected to find index.[${extensions.join('|')}] within ${relative(
			process.cwd(),
			srcDir
		)}`
	);
}
