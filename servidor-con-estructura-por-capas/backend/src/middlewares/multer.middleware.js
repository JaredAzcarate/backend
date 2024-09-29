import multer from 'multer';
import path from 'path';
import {__dirname} from '../utils/path.utils.js'

/* Configuración de Multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname,'../uploads/')); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        /* Guardo el nombre del archivo */
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, ext);
        const newFileName = `${timestamp}-${originalName}${ext}`;
        cb(null, newFileName);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Archivos permitidos solo imágenes.'));
        }
    }
});
