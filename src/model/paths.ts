/**
 * A set of paths needed for configuring webpack.
 */
export interface Paths {
	/**
	 * The path to the project root directory.
	 *
	 * (typically `process.cwd()`)
	 */
	projectDir: string;

	/**
	 * The path to the project sources directory.
	 *
	 * (typically `src`)
	 */
	srcDir: string;

	/**
	 * The path to the project source entry file.
	 *
	 * (typically `src/index.tsx`)
	 */
	srcEntryFile: string;

	/**
	 * The path to the project public directory.
	 *
	 * (typically `public`)
	 */
	publicDir: string;

	/**
	 * The path ot the project public entry file.
	 *
	 * (typically `public/index.html`)
	 */
	publicEntryFile: string;

	/**
	 * The URL the project is served from **without** trailing backslash!
	 *
	 * (typically the `"homepage"` property in the `package.json`)
	 */
	publicUrl: string;

	/**
	 * The output directory where the built content should be generated.
	 *
	 * (typically `build`)
	 */
	outDir: string;
}
