import Usuario from '../models/usuario.js'
import Hospital from '../models/hospital.js'
import Medico from '../models/medico.js'


export const getTodo = async (req, res) => {

    const { busqueda } = req.params
    const regex = new RegExp(busqueda, 'i');

    try {

        const [usuarios, hospitales, medicos] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
        ])

        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

export const getDocumentosColeccion = async (req, res) => {

    const { busqueda, tabla } = req.params
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {
        
        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex })
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                })

        }

        res.json({
            ok: true,
            resultados: data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};