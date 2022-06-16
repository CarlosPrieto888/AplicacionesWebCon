var express = require("express");
const cors = require("cors");
const {stderr} = require("process");
const dataBase = require("./config/db");

var app = express();
app.use(express.json());
app.use(cors());
dataBase();

//Las 4 coleciones
app.use("/user", require("./routes/user"));

app.use("/dni", require("./routes/dni"));
app.use("/busqueda", require("./routes/busqueda"));

app.listen(5000, function (req, res){
    console.log("Escuchando en 5000");
});
