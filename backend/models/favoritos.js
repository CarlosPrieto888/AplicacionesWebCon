const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Favoritos = new Schema({

    countFav: {
        type: String,
        required: true,
    }

});

module.exports = Favoritos;