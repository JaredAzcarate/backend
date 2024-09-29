import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config()

export const authMiddleware = (req, res, next) => {

    /* Obtengo el token a traves de las cookies */
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).render('login',{ status: "error", message: "Unauthorized" });
        /* return res.status(401).send({ status: "error", message: "Unauthorized" }); */
    }
    try {
        /* Decodifico los daots almacenados en el token */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        /* Almaceno los valores decodificados en una request llamada "user", entonces de esta manera puedo obtener el valor en el controller */
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).send({ status: "error", message: "Invalid token" });
    }
};
