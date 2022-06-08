const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Función que devuelve todos los usuarios
router.get("/", async function(req, res){
    try{
        const useresp = await User.find();
        res.json(useresp);
    }catch(e){
        console.log("Error en la peticion get", e);
        res.status(400).send("Error en el servidor");
    }
});

//Añade una card desde el body
router.post("/", async function(req, res) {  
    let idUser = req.body.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let dni = req.body.dni;
    let lugarNacimiento = req.body.lugarNacimiento;
    let descripcionPersonal = req.body.descripcionPersonal;
    let telefono = req.body.telefono;
    let contrasena = req.body.contrasena;
    let fechaCreacion = req.body.fechaCreacion;

    try{
        const usuario = {};

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.direccion = direccion;
        usuario.dni = dni;
        usuario.lugarNacimiento = lugarNacimiento;
        usuario.descripcionPersonal = descripcionPersonal;
        usuario.telefono = telefono;
        usuario.contrasena = contrasena;
        usuario.fechaCreacion = fechaCreacion;

        const user = new User(usuario);
        await user.save();

        return res.json(usuario);
    }catch(e){
        console.log("Error al añadir un usuario", e);
        return  res.status(400).send("Error al añadir un usuario");
    }
});

//Añade una card desde el body
router.put("/", async function(req, res){    
    let idUser = req.body.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let dni = req.body.dni;
    let lugarNacimiento = req.body.lugarNacimiento;
    let descripcionPersonal = req.body.descripcionPersonal;
    let telefono = req.body.telefono;
    let fechaCreacion = req.body.fechaCreacion;
                                 
    try{
        //mirar por si acaso el id de mongo
        let currentCard = await User.findById(idUser);
        if(!currentCard){
            return res.status(400).send("Usuario no encontrado ");
        }

        let nuevaCard = await User.findOneAndUpdate({id:idUser}, {nombre:nombre, apellido:apellido, direccion:direccion, dni:dni, lugarNacimiento:lugarNacimiento, descripcionPersonal:descripcionPersonal, telefono:telefono, fechaCreacion:fechaCreacion});
        return res.json(nuevaCard);
        
    }catch(e){
        console.log("Error al modificar el usuario",e);
        return  res.status(400).send("Error al cambiar usuario");
    }
});

//Elimina una card desde el body
router.delete("/:id", async function(req, res) {     

    let idUser = req.params.id;

    try{
        let borrados = await User.deleteOne({_id:idUser});
        if(borrados.deletedCount === 0){
            return res.status(400).send("Usuario no existe por lo tanto no se puede eliminar");
        }
        return res.send("Usuario eliminado correctamente");
    }catch(e){
        console.log("Error al borrar el usuario en la base de datos", e);
        return res.status(400).send("Error al eliminar usuario");
    }
});

module.exports = router;