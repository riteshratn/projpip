const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const requestLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'access.log' }),
  ],
});

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

module.exports = { requestLogger, errorLogger };
