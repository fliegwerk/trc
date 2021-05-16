#!/usr/bin/env node
// https://github.com/microsoft/TypeScript/pull/4120

import yargs from 'yargs';
import ch from 'chalk';

import { getLogger } from './logger';
import { getPaths } from './utils';

import { build, watch } from './lib';
import { getWebpackConfig } from './lib/get-webpack-config';
import { getDevServerConfig } from './lib/get-dev-server-config';

const logger = getLogger('trc-cli');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	logger.error(err);
	throw err;
});

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

try {
	const paths = getPaths();
	logger.debug('Paths:', JSON.stringify(paths, null, 2));

	const config = getWebpackConfig(paths);
	const devServerConfig = getDevServerConfig();

	if (args['watch']) {
		// watch stuff
		logger.info(`Big brother's watching you (I mean: this folder :P)`);
		watch(config, devServerConfig);
	} else {
		logger.info(
			`Let's just build stuff (use ${ch.blueBright(`--watch`)} or ${ch.blueBright(
				`-w`
			)} to do something else)`
		);
		build(config);
	}
} catch (err) {
	logger.error(err.message);
}
