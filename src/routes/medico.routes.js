import { Router } from 'express';
import { addMedico, deleteMedico, getMedicos, updateMedico } from '../controllers/medicos.controller.js';
import { validarJwt } from '../middlewares/validar-jwt.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router()

router.get('/', getMedicos);

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id debe ser válido').isMongoId(),
    validarCampos,
], addMedico);

router.put('/:id', updateMedico);

router.delete('/:id', deleteMedico);


export default router;