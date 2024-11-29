import { Router } from 'express';
import { check } from 'express-validator';
import { addUsuario, DeleteUsuario, getUsuarios, updateUsuario } from '../controllers/usuarios.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJwt } from '../middlewares/validar-jwt.js';


const router = Router()

router.get('/', validarJwt ,getUsuarios);

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
], addUsuario);

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').isEmail(),
    check('id', 'No es un id valido').isMongoId(),
    // check('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos,
], updateUsuario);

router.delete('/:id', validarJwt, DeleteUsuario);


export default router;