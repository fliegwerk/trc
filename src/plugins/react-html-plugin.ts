import { Compiler } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export type Replacers = Record<string, string>;

export class ReactHtmlPlugin {
	readonly plugin: typeof HTMLWebpackPlugin;

	readonly replacers: Replacers;

	constructor(plugin: typeof HTMLWebpackPlugin, replacers: Replacers) {
		this.plugin = plugin;
		this.replacers = replacers;
	}

	apply(compiler: Compiler) {
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
