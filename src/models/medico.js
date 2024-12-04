import { Schema, model } from 'mongoose';


const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collection: 'medicos' });

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})


export default model('Medico', MedicoSchema);
 