import { Compiler } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

/**
 * A key-value pair set of replacements, where the key, surrounded by `%` (e.g., `ABC` becomes `%ABC%`) gets replaced
 * with the value within this record.
 */
export type Replacers = Record<string, string>;

/**
 * A plugin for injecting into {@link HTMLWebpackPlugin} to replace specific placeholders (e.g., `%PUBLIC_URL%`)
 * within the public entry file (commonly `index.html`).
 */
export class ReactHtmlPlugin {
	/**
	 * Creates a new instance of the {@link ReactHtmlPlugin}
	 *
	 * @param plugin - reference to the plugin class which gets injected
	 * (must match the interface of {@link HTMLWebpackPlugin}).
	 * @param replacers - a set of replacers which get replaced.
	 *
	 * @see {@link Replacers}
	 *
	 * @example
	 * ```ts
	 * new ReactHTMLPlugin(HTMLWebpackPlugin, { PUBLIC_URL: '.' })
	 * ```
	 */
	constructor(
		private readonly plugin: typeof HTMLWebpackPlugin,
		private readonly replacers: Replacers
	) {}

	/**
	 * {@inheritDoc}
	 *
	 * @example
	 * ```ts
	 * plugin.apply(compiler); // :P example just here to satisfy linter
	 * ```
	 */
	apply(compiler: Compiler): void {
		compiler.hooks.compilation.tap('ReactHtmlPlugin', compilation => {
			this.plugin
				.getHooks(compilation)
				.afterTemplateExecution.tap('ReactHtmlPlugin', data => {
					Object.keys(this.replacers).forEach(key => {
						data.html = data.html.replace(
							new RegExp(`%${key}%`, 'g'),
							this.replacers[key]
						);
					});

					return data;
				});
		});
	}
}
