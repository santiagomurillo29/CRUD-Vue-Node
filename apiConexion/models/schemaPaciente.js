import mongoose from 'mongoose'

// Creamos la funcion conectar
async function conectarBD() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/local');
        console.log('Se conecto a MongoDB');
    }
    catch (error){
        console.error('Error al conectar a MongoDB', error)
    }
}
// Llamada a la funcion conectar
conectarBD()


const pacienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    fecha: String,
    documento: {
        type: String,
        unique: true
    }
    
})
const Paciente = mongoose.model('pacientes', pacienteSchema)

export default Paciente;
