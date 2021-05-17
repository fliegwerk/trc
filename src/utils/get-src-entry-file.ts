import { join, relative } from 'path';
import { existsSync } from 'fs';

/**
 * Searches the source folder for an `index.[tsx|ts|jsx|js]`
 *
 * @param srcDir - the directory of the source files
 *
 * @throws Error if no entry file can be found
 *
 * @returns the path to the entry file.
 *
 * @example
 * ```ts
 * const entryFile = getSrcEntryFile(
 * 		path.join(process.cwd(), 'src')
 * );
 * ```
 */
export function getSrcEntryFile(srcDir: string): string {
	const extensions = ['tsx', 'ts', 'js', 'jsx'];

	for (const filepath of extensions.map(ext => join(srcDir, `index.${ext}`))) {
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
