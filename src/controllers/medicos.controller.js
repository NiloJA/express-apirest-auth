import Medico from "../models/medico.js";



export const getMedicos = async (req, res) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    })
};


export const addMedico = async (req, res) => {
    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body })

    try {

        const medicoDB = await medico.save()

        res.json({
            ok: true,
            medico : medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
};

export const updateMedico = async (req, res) => {
    res.json({
        ok: true,
        msg: 'updateMedico'
    })
};

export const deleteMedico = async (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteMedico'
    })
};

