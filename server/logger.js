const { createLogger, transports, format } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error'}),
        new transports.File({ filename: 'logs/common.log'})
    ]
});

// for debugging purpose
if (process.env.NODE_ENV != 'production') {
    logger.add(new transports.Console({
        format:combine(
            timestamp(),
            format.colorize(),
            logFormat
        )
    }));
}

module.exports = logger;