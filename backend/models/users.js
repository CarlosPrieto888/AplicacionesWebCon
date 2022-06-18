const mongoose = require("mongoose");
const avatares = require("./avatares");
const favoritos = require("./favoritos");
const comentarios = require("./comentarios");
const Schema = mongoose.Schema;

let Users = new Schema({

    nombre: {
        type: String,
        required: true,
    },

    apellido: {
        type: String,
        required: true,
    },

    direccion: {
        type: String,
        required: true,
    },

    dni: {
        type: String,
        required: true,
        unique: true,
    },

    lugarNacimiento: {
        type: String,
        required: true,
    },

    descripcionPersonal: {
        type: String,
        required: true,
    },

    telefono: {
        type: String,
        required: true,
    },

    contrasena: {
        type: String,
        required: true,
    },

    fechaCreacion: {
        type: String,
        required: true,
    },

    //Agregamos las demas coleciones
    favoritos:[favoritos],
    avatares:[avatares],
    comentarios:[comentarios]
});

module.exports = mongoose.model("users", Users);