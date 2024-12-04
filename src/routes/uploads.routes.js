import { Router } from 'express';
import expressFileUpload from 'express-fileupload';
import { fileUpload, retornaImagen } from '../controllers/uploads.controller.js';
import { validarJwt } from '../middlewares/validar-jwt.js';

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJwt, fileUpload);
router.get('/:tipo/:foto', retornaImagen)


export default router; 