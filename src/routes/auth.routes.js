import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/', [
    check('email', 'El email es oblogatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);




export default router;