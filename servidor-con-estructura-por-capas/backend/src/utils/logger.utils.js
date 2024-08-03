// src/utils/logger.utils.js
import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const { combine, timestamp, printf, colorize } = format;

/* Formato del log */
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

/* Niveles */
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    }
};

/* Logger de desarrollo */
const devLogger = createLogger({
    levels: customLevels.levels,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({ level: 'debug' })
    ]
});

/* Logger de producción */
const prodLogger = createLogger({
    levels: customLevels.levels,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: './errors.log', level: 'error' })
    ]
});

/* Logger según el entorno */
const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export default logger;
