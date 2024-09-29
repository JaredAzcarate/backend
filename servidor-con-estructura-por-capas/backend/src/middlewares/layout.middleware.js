import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const layoutMiddleware = (req, res, next) => {
    
    /* Obtengo el oid de las cookies */
    const oid = req.cookies.oid;
    res.locals.oid = oid ? oid : null;

    /* Verifico la autenticación */
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            res.locals.isAuthenticated = true;
            res.locals.user = decoded;
        } catch (error) {
            /* Si el token es inválido */
            res.locals.isAuthenticated = false; 
        }
    } else {
        /* Si no hay token */
        res.locals.isAuthenticated = false;
    }

    next();
};
