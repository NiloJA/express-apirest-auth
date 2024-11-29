import { generarJwt } from "../helpers/jwt.js";
import usuario from "../models/usuario.js";
import bcrypt from 'bcryptjs';


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Verificar Email
        const usuarioDB = await usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar Contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res,json(400).json({
                ok: false,
                msg: 'Password no válido'
            });
        }

        // Generar el Token - JWT
        const token = await generarJwt( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
};