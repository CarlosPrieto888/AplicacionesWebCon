const express = require("express");
const router = express.Router();
const User = require("../models/users");

//Función que apartir de un dni recibido por el body te devuelve el id del objeto
router.get("/", async function(req, res){
    let dni = req.body.dni;
    console.log(dni);

    try{
        const userDni = await User.findOne({dni:dni});

        if(!userDni){
            return res.status(400).send("Usuario no encontrado ");
        }

        return res.status(200).send(userDni.id);
    }catch(e){
        console.log("Error en la peticion get del id", e);
        res.status(400).send("Error en el servidor en peticion get del id");
    }
});

module.exports = router;