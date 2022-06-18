const mongoose = require("mongoose");
const config = require("config");
const db = process.env.MONGODB_URI || config.get("mongoUrl");

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Base de datos conectada con Mongo");
    }catch(e){
        console.error(e);
        process.exit(1);
    }
};

module.exports = connectDB;