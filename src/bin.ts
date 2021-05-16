#!/usr/bin/env node
// https://github.com/microsoft/TypeScript/pull/4120

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	console.error(err);
	throw err;
});

import yargs from 'yargs';

const args = yargs
	.scriptName('trc')
	.option('watch', {
		alias: 'w',
		type: 'boolean',
		description: 'Automatically rebuild on source change'
	})
	.option('verbose', {
		alias: 'v',
		type: 'boolean',
		description: 'Run with verbose logging'
	})
	.showHelpOnFail(false, 'Specify --help for available options')
	.help()
	.parse();

// Execute stuff based on args

if (args['watch']) {
	// watch stuff
}
