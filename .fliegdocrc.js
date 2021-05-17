const { HTMLTheme } = require('fliegdoc');

module.exports = {
	baseUrl: '/trc/',
	outDir: './docs',
	readme: './README.md',
	modules: [
		{
			package: './package.json',
			tsconfig: './tsconfig.json',
			mainFile: 'index.ts'
		}
	],
	title: 'fliegwerk trc programmatic API', // appears in the page title and header
	externalLinks: {
		GitHub: 'https://github.copm/fliegwerk/webpack-typescript-react-compiler'
	}, // e.g.: { "GitHub": "https://github.com/fliegwerk/fliegdoc" }
	hidePrivateMembers: true,
	theme: HTMLTheme
};
