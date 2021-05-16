import {Logger, ChalkLogger, ComponentLogger} from "@fliegwerk/logsemts";
import chalk from 'chalk';

const logger = new Logger({
	loggers: [ChalkLogger(chalk)]
});

export function getLogger(component: string): ComponentLogger {
	return logger.getComponentLogger(component);
}
