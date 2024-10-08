import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: false },
    breed: { type: String, required: false },
    color: { type: String, required: false },
    sex: { type: String, enum: ['Macho', 'Hembra'], required: false },
    chipNumber: { type: String, required: false },
    healthStatus: { type: String, required: false },
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    image: { type: String, required: true },  // URL de la imagen
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Referencia al usuario dueño
}, {
    timestamps: true,
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet;
