import { Router } from 'express';
import { getDocumentosColeccion, getTodo } from '../controllers/busquedas.controller.js';
import { validarJwt } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/:busqueda', validarJwt, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentosColeccion);


export default router;