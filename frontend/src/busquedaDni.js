import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useParams, useState, useNavigate } from "react-router-dom";
import axios from "axios";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "9%",
    maxHeight: "9%",
  });

export function menuBusqueda() {

    //Variable creada para volver a la pantalla de inicio
    const navigate = React.useNavigate();

   /*const {dni} = React.useParams();
    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [lugarNacimiento, setLuegarNacimiento] = React.useState("");
    const [direccion, setDireccion] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [trabajo, setTrabajo] = React.useState("");
    const [descripcionPersonal, setDescripcionPersonal] = React.useState("");

    function extraerDatos(){
        axios.get("http://localhost:5000/busqueda/"+dni)
        .then(function(response){
            if(response.status===200){
                setNombre(response.data.nombre);
                setApellido(response.data.apellido);
                setLuegarNacimiento(response.data.lugarNacimiento);
                setDireccion(response.data.direccion);
                setTelefono(response.data.telefono);
                setTrabajo(response.data.trabajo);
                setDescripcionPersonal(response.data.descripcionPersonal);
            }else{
                console.log("Error axios busqueda "+response.status);
            }
        }).catch(function(e){
            console.error(e)
        });
    }*/

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "lightskyblue" }}>
            <Toolbar disableGutters>
            <Img
                src={
                "https://static.vecteezy.com/system/resources/thumbnails/004/283/847/small/ia-logo-monogram-emblem-style-with-crown-shape-design-template-free-vector.jpg"
                }
            />

            <Typography
                    align="center"
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
            >
                Busqueda de Usuario por DNI
            </Typography>

            <Button onClick={(e) => navigate("/login")}>LogOut</Button>

            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default menuBusqueda;
