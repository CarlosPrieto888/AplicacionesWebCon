const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Avatares = new Schema({

    avatar: {
        type: String,
        required: true,
    }

});

module.exports = Avatares;