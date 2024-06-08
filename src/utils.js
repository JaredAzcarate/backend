import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'

/* Función para crear contraseña el hasheo de la contraseña a partir de 10 caracteres */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/* Función para comparar contraseña hasheada con la ingresada por el usuario */
export const isValiPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);

export default __dirName