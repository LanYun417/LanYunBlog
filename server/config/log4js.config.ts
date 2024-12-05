export const log4jsConfig = {
	appenders: {
		console: { type: 'console' },
		info: {
			type: 'file',
			filename: 'logs/info.log',
		},
		error: {
			type: 'file',
			filename: 'logs/error.log',
		},
		dbLog: {
			type: 'file',
			filename: 'logs/db.log',
		},
	},
	categories: {
		default: {
			appenders: ['info', 'console'],
			level: 'debug',
		},
		info: {
			appenders: ['info', 'console'],
			level: 'info',
		},
		error: {
			appenders: ['error', 'console'],
			level: 'error',
		},
		dbLog: {
			appenders: ['dbLog'],
			level: 'info',
		},
	},
};
