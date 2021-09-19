const winston = require('winston');

const serviceName = 'backend-coding-test';
const logDir = 'log';
const errorLogFilename = logDir + '/' + serviceName + '-error.log';
const serviceLogFilename = logDir + '/' + serviceName + '.log';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: serviceName },
    transports: [
        new winston.transports.File({ filename: errorLogFilename, level: 'error' }),
        new winston.transports.File({ filename: serviceLogFilename }),
    ],
});

module.exports = logger;
