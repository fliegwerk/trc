#!/usr/bin/env node
// https://github.com/microsoft/TypeScript/pull/4120

import yargs from 'yargs';
import ch from 'chalk';

import { getLogger, getPaths } from './utils';
import { build, watch } from './lib';
import { getWebpackConfig, getDevServerConfig } from './config';

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
	.option('debug', {
		type: 'string',
		description: 'Run with verbose logging'
	})
	.showHelpOnFail(false, 'Specify --help for available options')
	.help()
	.parse();

process.env.DEBUG = args['debug'];

try {
	const paths = getPaths();
	logger.debug('Project directory:', paths.projectDir);
	logger.debug('Entry file:', paths.srcEntryFile);
	logger.debug('Output directory:', paths.outDir);

	const isDev = !!args['watch'];

	logger.info('Building for:', isDev ? 'development' : 'production');

	const config = getWebpackConfig(paths, isDev);
	const devServerConfig = getDevServerConfig();

	// Execute stuff based on args
	if (args['watch']) {
		// watch stuff
		logger.info(`Big brother's watching you (I mean: this folder :P)`);
		watch(config, devServerConfig);
	} else {
		logger.info(
			`Let's just build stuff (use ${ch.blueBright(
				`--watch`
			)} or ${ch.blueBright(`-w`)} to do something else)`
		);
		build(config);
	}
} catch (err) {
	logger.error(err.message);
}
