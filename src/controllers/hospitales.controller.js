import Hospital from "../models/hospital.js";



export const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
};


export const addHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });  
  
    
    try {
        
        const hospitalDB = await hospital.save();

        res.status(201).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

export const updateHospital = async (req, res) => {
    res.json({
        ok: true,
        msg: 'updateHospital'
    })
};

export const deleteHospital = async (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
};

