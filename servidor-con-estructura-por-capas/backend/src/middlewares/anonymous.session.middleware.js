import { v4 as uuidv4 } from 'uuid';

export const anonymousSessionMiddleware = (req, res, next) => {
    if (!req.cookies.sessionId) {
        const sessionId = uuidv4();
        res.cookie('sessionId', sessionId, { httpOnly: true });
    }
    next();
};
