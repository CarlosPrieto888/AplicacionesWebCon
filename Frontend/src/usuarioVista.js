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

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

export function UsuarioVista({ nombre, apellido, direccion, dni, lugarNacimiento, trabajo, descripcionPersonal, telefono}){

  const [users, setUsers] = React.useState([]);
  const [editCopia, setEditCopia] = React.useState([]); //Este hook es para actualizar el grid
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  function insertUser(nombre, apellido, direccion, dni, lugarNacimiento, trabajo, descripcionPersonal, telefono){
    // Almaceno la informacion de la nota en el array de cards.
    const copia = [...users];
    copia.push({
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      dni: dni,
      lugarNacimiento: lugarNacimiento,
      trabajo: trabajo,
      descripcionPersonal: descripcionPersonal,
      telefono: telefono,
    });
    setUsers(copia);
  }

  function removeUser(id){
    setUsers((cards) => cards.filter(e => e.id !== id));
  }

  //Funcion para actualizar el grid de las cards
  function updateCard(card){
    const copias = [...users];
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
    setUsers(nuevaCopia);
  }

  //Aqui aniadimos al usuario al grid
  //insertUser("nombre", "apellido", "direccion", "dni", "lugarNacimiento", "trabajo", "descripcionPersonal", "telefono");

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
              Vista de Usuario
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

        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id}>
            {/*Aqui accederiamos a la clase notas*/}
            <CardUser
              user={user}
              removeUser={removeUser}
            >
            </CardUser>
          </Grid>
        ))}
      </Grid>

    </Box>

   
  );
}

export default UsuarioVista
