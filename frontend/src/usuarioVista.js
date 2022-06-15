import * as React from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material';
import Grid from '@mui/material/Grid';
import CardUser from "./cards/cardUser";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from './Footer'

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

export function UsuarioVista(){

  const {dni} = useParams();
  const [user, setUser] = React.useState([]);
  const [editCopia, setEditCopia] = React.useState([]); //Este hook es para actualizar el grid
  const [open, setOpen] = React.useState(false);

  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  function insertUser(){
    //Extraemos el usuario de la base de datos
    axios.get("http://localhost:5000/busqueda/"+dni)
    .then(function(response, required){
     /* if(response.status===200){
        //Aquí obtenemos el usuario que se acaba de crear
        let usuarios = response.data;
        let i = 0;
        while(i<usuarios.length){
          if(usuarios[i].dni===dni){
            setUser(usuarios[i]);
            break;
          }
          i++;
        }
      }*/
      console.log(response.data.nombre);
      setUser(response.data);
    });
  }

  function removeUser(id){
    //Aqui implementar la peticion de borrado del usuario
    axios.delete("http://localhost:5000/user/"+id)
    .then(function(response){
      if(response.status === 200){
        console.log("Todo salio de forma correcta al borrar el usuario");
        //Aqui implementar la peticion del ID del usuario
        setUser((cards) => cards.filter(e => e._id !== id));
      }else{
        console.log("Error al borrar al usuario ", response.status);
      }
    });
  }

  //Funcion para actualizar el grid de las cards
  function editUser(card){
    const copias = [...user];
    const nuevaCopia = copias.map(copia => {
      if(copia.dni === editCopia.dni){
        return {
          nombre: copia.nombre,
          apellido: copia.apellido,
          direccion: copia.direccion,
          dni: copia.dni,
          lugarNacimiento: copia.lugarNacimiento,
          trabajo: copia.trabajo,
          descripcionPersonal: copia.descripcionPersonal,
          telefono: copia.telefono,
          fechaCreacion: Date.now(),
        }
      }
    });
    setUser(nuevaCopia);
  }

  return(
    <Box sx={{ flexGrow: 10 }}>
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
              Vista del Usuario con DNI: {dni}
            </Typography>

            <Button onClick={handleClickOpen}>Normas de la Empresa</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Politicas de Privacidad
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    1. Según la ley orgánica del 15/1999 queda totalmente prohibido compartir datos personales de los usuarios.
                  </DialogContentText>
                  <DialogContentText>
                    2. Según la ley orgánica del 5/1992 todo usuario podrá cambiar sus datos si es solicitado.
                  </DialogContentText>
                  <DialogContentText>
                    3. Según la ley orgánica del 3/2018 los usuarios solo podrán ver sus propios datos.
                  </DialogContentText>
                </DialogContent>
            </Dialog>

            <Button onClick={(e) => navigate("/login")}>LogOut</Button>

        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardUser
          user={user}
          removeUser={removeUser}
          editUser={editUser}
          mode="User"
        >
        </CardUser>
      </Box>
      <Footer/> 
    </Box>

   
  );
}

export default UsuarioVista