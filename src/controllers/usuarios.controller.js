import Usuario from "../models/usuario.js"
import { response } from 'express';
import bcrypt from 'bcryptjs';
import { generarJwt } from "../helpers/jwt.js";



export const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    
    try {
        const [usuarios, total] = await Promise.all([
            Usuario
                .find({}, 'nombre email role google img')
                .skip( desde )
                .limit( 5 ),

            Usuario.countDocuments()
        ]);
    
        res.json({
            ok: true,
            usuarios,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
   
}

export const addUsuario = async (req, res = response) => {

    const { email, password } = req.body;



    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        
        // Guardar usuario
        await usuario.save();

        // Generar el Toke - JWT
        const token = await generarJwt( usuario.id );

        res.status(201).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar Logs'
        })
    }

}

export const updateUsuario = async (req, res = response) => { 

    // Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Actualizaciones
        const { _id, google, password, email, ...campos } = req.body;

        if ( usuarioDB.email === email ) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

          
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};

export const DeleteUsuario = async (req, res) => {
    const uid = req.params.id

    try {

        const usuario = await Usuario.findById( uid )

        if ( !usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }

    
};