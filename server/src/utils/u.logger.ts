import log4js from 'log4js';
import { log4jsConfig } from 'config/log4js.config';

log4js.configure(log4jsConfig);

export const debug = (content: any): void => {
	let logger = log4js.getLogger('debug');
	logger.level = 'debug';
	logger.debug(content);
};

export const info = (content: any): void => {
	let logger = log4js.getLogger('info');
	logger.level = 'info';
	logger.info(content);
};

export const error = (content: any): void => {
	let logger = log4js.getLogger('error');
	logger.level = 'error';
	logger.error(content);
};

export const dbLog = (content: any): void => {
	let logger = log4js.getLogger('dbLog');
	logger.level = 'info';
	logger.info(content);
};
