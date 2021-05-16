declare module 'pnp-webpack-plugin' {
	interface Applier {
		apply: (resolver: any) => void;
	}

	export function apply(resolver: any): void;
	export function makePlugin(locator: any, filter: any): Applier;
	export function moduleLoader(module: any): Applier;
	export const topLevelLoader: Applier;
	export function bind(filter: any, module: any, dependency: any): Applier;
	export function tsLoaderOptions(options: object): object;
	export function forkTsCheckerOptions(options: object): object;
}
