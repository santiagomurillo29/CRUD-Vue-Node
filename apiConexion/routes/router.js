import { Router } from "express";
import  Registro from '../models/schemaRegistro.js';
import Paciente from '../models/schemaPaciente.js'

const router = Router()



router.post('/registrar', async (req, res) =>{
    try{
        const {nombre, correo, password} = req.body
    
        const registroUsuarios = new Registro({
            nombre,
            correo,
            password
        })
        const usuarioExist = await Registro.findOne({correo})

        if(usuarioExist){
            res.json({error: 'El correo ya existe'})
        }
        else{
            await registroUsuarios.save()
            const registro = true;
            res.json({ verificar : registro});
        }
        
    }
    catch(error){
        res.json({ error : 'Error al agregar un nuevo usuario'})
    }
})




router.post('/iniciar', async (req, res) =>{
    try{
        const {correo, password} = req.body;

        // buscamos el usuarios por medio del correo
        const usuario = await Registro.findOne({correo})
        const nombreUsuario = usuario.nombre
        
        //validamos las contraseñas
        if(password == usuario.password){
            let isLogin = true;
            res.json({verificar: isLogin, nombreU: nombreUsuario})
        }
        else{
            res.json({ error: 'Correo o contraseña incorrectos' })
        }
    }
    catch(error){
        res.status(500).json({ error: 'Error al iniciar sesión'});
    }
})


router.post('/insert', async (req, res) =>{
    try{
        const {nombre, apellido, fecha, documento} = req.body;

        const insertarPaciente = new Paciente ({
            nombre,
            apellido,
            fecha,
            documento
        })
        await insertarPaciente.save()
        res.status(200).json({ message: 'Usuario registrado correctamente' });
    }   
    catch(error){
        res.status(500).json({error : 'Error al agregar un nuevo usuario'})
    }
})


router.get('/home', async (req, res) =>{
    let Pacientes = await Paciente.find()
    res.json({pte: Pacientes})
})


router.delete('/eliminar', async (req, res) =>{
    try{
        const {id} = req.body;
        const eliminar = await Paciente.findByIdAndDelete(id)

        if(!eliminar){
            res.status(404).json({error: 'Paciente no encontrado'})
        }
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
        
    }
    catch(error){
        res.status(500).json({error: 'Error al eliminar paciente'})

    }
})


router.put('/actualizar', async (req, res) =>{
    try{
        const {id, nombre, apellido, fecha, documento} = req.body;

        const actualizar = await Paciente.findByIdAndUpdate(
            id,
            {
                nombre,
                apellido,
                fecha,
                documento
            },
            {new: true}
        );
        await actualizar.save()
        res.status(200).json({ message: 'Usuario registrado correctamente' });

    }
    catch(error){
        res.status(500).json({ error: 'Error al actualizar el paciente' });
    }
})


export default router;