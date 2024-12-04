import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { actualizarImagen } from '../helpers/actualizar-imagen.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const fileUpload = async (req, res) => {
    const { tipo, id } = req.params;
    try {

        // Validar tipo
        const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
        if ( !tiposValidos.includes(tipo) ) {
            return res.status(400).json({
                ok: false,
                msg: 'No es un médico, usuario u hospital (tipo)'
            });
        }

        // Validar que exista un archivo
        if ( !req.files || Object.keys(req.files).length === 0 ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningún archivo'
            })
        }

        // Procesar una imagen
        const file = req.files.imagen;
        
        const nombreCortado = file.name.split('.'); // wolverine.1.2.3.jpg
        const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

        // Validar extension
        const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
        if ( !extensionesValidas.includes(extensionArchivo) ) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extensión permitida'
            });
        }

        // Generar el nombre del archivo
        const nombreArchivo = `${ uuid()}.${ extensionArchivo }`;

        // Path para guardar la imagen
        const path = `./src/uploads/${ tipo }/${ nombreArchivo }`;

        // Mover la imagen
        file.mv(path, (err) => {
            if (err){
                console.log(err)
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }

            // Actualizar base de datos
            actualizarImagen( tipo, id, nombreArchivo );

            res.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo,
            })
        });

        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

export const retornaImagen = (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    try {

        const { tipo, foto } = req.params;

        const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

        // Imagen por defecto
        if ( !fs.existsSync( pathImg ) ) {
            const pathImg = path.join( __dirname, '../uploads/no-photo.jpg');
            return res.sendFile( pathImg );
        }

        res.sendFile( pathImg );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};