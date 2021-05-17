import {
	Logger,
	ChalkLogger,
	ComponentLogger,
	types
} from '@fliegwerk/logsemts';
import chalk from 'chalk';
import pm from 'picomatch';

const chalkLogger = ChalkLogger(chalk);
const ourLogger: types.LogFunction = (type, style, componentName, ...args) => {
	const isMatch = pm(process.env.DEBUG || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	type === 'DEBUG'
		? isMatch(componentName)
			? chalkLogger(type, style, componentName, ...args)
			: undefined
		: chalkLogger(type, style, componentName, ...args);
};

const logger = new Logger({
	loggers: [ourLogger]
});

/**
 * Returns a _logsemts_ {@link ComponentLogger} for the given `component`.
 *
 * This provides the capability of logging in a style consistent with the one of `trc`
 *
 * @param component - the component for which the logger gets created
 *
 * @returns the {@link ComponentLogger} for `component`
 *
 * @example
 * ```ts
 * const logger = getLogger('my-componenet');
 *
 * logger.success('A success message');
 * logger.warn('A warning message');
 * logger.error('An error message');
 * logger.info('An information');
 *
 * // gets printed when DEBUG is set to a pattern matching 'my-component'
 * logger.debug('Some debug information');
 * ```
 */
export function getLogger(component: string): ComponentLogger {
	return logger.getComponentLogger(component);
}
