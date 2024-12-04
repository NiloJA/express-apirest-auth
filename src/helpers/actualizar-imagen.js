import fs from 'fs';
import Usuario from '../models/usuario.js';
import Medico from '../models/medico.js';
import Hospital from '../models/hospital.js';

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // Borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

export const actualizarImagen = async ( tipo, id, nombreArchivo )  => {

    switch ( tipo ) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if ( !medico ) {
                console.log('No es un médico por id');
                return  false;
            }

            const pathViejo = `./src/uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return  false;
            }

            const pathViejos = `./src/uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejos );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return  false;
            }

            const pathOld = `./src/uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathOld );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        
    }

} 