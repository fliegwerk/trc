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

export function getLogger(component: string): ComponentLogger {
	return logger.getComponentLogger(component);
}
