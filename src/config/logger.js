/**
 * Custom logging format.
 * 
 * @module winston
 * 
 * @return {object} logger - Configured Winston logger instance.
 */
const winston = require('winston');

// Define severity levels.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

// Setup log format.
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message.trim()}`, // Ensure no extra newline
    ),
)

// Define transports for logging.
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
]

// Logger Instance
const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

module.exports = logger