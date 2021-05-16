import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Returns the path to the project directory (i.e., the folder that contains the package.json).
 *
 * Searches upwards, starting in the CWD.
 *
 * @throws Error if no project directory gets found
 *
 * @return the project directory
 */
export function getProjectDir(): string {
	let currentDir = process.cwd();

	while (
		!existsSync(join(currentDir, 'package.json')) &&
		currentDir !== join(currentDir, '..')
	) {
		currentDir = join(currentDir, '..');
	}

	if (!existsSync(join(currentDir, 'package.json'))) {
		throw new Error(
			'No project folder found. Expected to find package.json' +
				' within either the CWD or a parent directory thereof.'
		);
	}

	return currentDir;
}
