import { Router } from 'express';
import { addHospital, deleteHospital, getHospitales, updateHospital } from '../controllers/hospitales.controller.js';
import { validarJwt } from '../middlewares/validar-jwt.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/', getHospitales);
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], addHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);


export default router;