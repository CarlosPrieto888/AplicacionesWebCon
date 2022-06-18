var express = require("express");
const cors = require("cors");
const {stderr} = require("process");
const dataBase = require("./config/db");

var app = express();
app.use(express.json());
app.use(cors());
dataBase();

//Las 4 coleciones
app.use("/api/user", require("./routes/user"));

app.use("/api/dni", require("./routes/dni"));
app.use("/api/busqueda", require("./routes/busqueda"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("../frontend/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, function (req, res){
    console.log("Escuchando en 5000");
});
