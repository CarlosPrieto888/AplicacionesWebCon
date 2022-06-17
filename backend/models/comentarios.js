const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Comentarios = new Schema({

    comentario: {
        type: String,
        required: true,
    }

});

module.exports = Comentarios;