import { join } from 'path';

/**
 * Extracts the `"homepage"´ property from the project's `package.json`.
 * @param projectDir - the path to the project
 */
export function getPublicUrl(projectDir: string): string {
	const packageJsonPath = join(projectDir, 'package.json');
	return require(packageJsonPath).homepage || '';
}
