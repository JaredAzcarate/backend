import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

/* Función para crear contraseña el hasheo de la contraseña a partir de 10 caracteres */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/* Función para comparar contraseña hasheada con la ingresada por el usuario */
export const isValiPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

const PRIVATE_KEY = "CoderSecret"

const generateToken = (user) => {
    const token = jwt.sign((user),PRIVATE_KEY, {expiresIn:"24h"} )
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).send({ error: "No autenticado" })
    const token = authHeader.split(" ")[1]

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "No autorizado" })
        req.user = credentials.user
        next()
    })
}

export default {__dirName, generateToken, authToken}