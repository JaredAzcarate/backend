import logger from '../utils/logger.utils.js';

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`HTTP ${req.method} ${req.url}`);
    next();
};

export const logErrors = (err, req, res, next) => {
    req.logger.error(`Error: ${err.message}`);
    res.status(500).send('Hubo un error');
    next(err);
};
