import { join } from 'path';

/**
 * Extracts the `"homepage"` property from the project's `package.json`.
 * @param projectDir - the path to the project
 *
 * @returns the public url
 *
 * @example
 * ```ts
 * const publicUrl = getPublicUrl(
 * 		getProjectDir()
 * );
 * ```
 */
export function getPublicUrl(projectDir: string): string {
	const packageJsonPath = join(projectDir, 'package.json');
	/* eslint-disable @typescript-eslint/no-var-requires */
	return require(packageJsonPath).homepage || '';
}
