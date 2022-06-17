import * as React from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DialogContent, DialogContentText, DialogTitle, Dialog, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import CardUser from "./cards/cardUser";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Footer from './Footer'

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

function UsuarioVista(){

  const {dni} = useParams();
  const [users, setUsers] = React.useState([]);
  const [editCopia, setEditCopia] = React.useState([]); //Este hook es para actualizar el grid
  const [open, setOpen] = React.useState(false);
  const [openComent, setOpenComent] = React.useState(false);

  const handleClickOpenComent = () => {
    setOpenComent(true);
  };

  const handleCloseOpenComent = () => {
    setOpenComent(false);
  };

  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const dialogComent = () => {
    return(
      <div>
        <Dialog openComent={openComent} onClose={handleClickOpenComent}>
           <DialogTitle>Añadir Comentario</DialogTitle>
           <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="comentario"
                label="Comentario Usuario"
                type="email"
                fullWidth
                variant="standard"
              />
           </DialogContent>
           <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={(e) => addComent()}>Añadir</Button>
           </DialogActions>
        </Dialog>
      </div>
    );
  }

    //Persistencia de usuarios de la base de datos 
    function usuariosGrid(){
      //Aqui aniadir lo del axios hacer un get con todos los usuers de la base de datos
      axios.get("http://localhost:5000/api/user")
      .then(function(res, req){
        setUsers(res.data);
        console.log("Recibiendo todos los usuarios");
      });
    }
    //La funcion la usariamos así
    React.useEffect(function(){
      usuariosGrid();
    }, []); //Si no ponemos el array es como si no lo cerraramos

  function insertUser(){
    //Extraemos el usuario de la base de datos
    axios.get("http://localhost:5000/api/busqueda/"+dni)
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
      setUsers(response.data);
    });
  }

  function removeUser(id){
    //Aqui implementar la peticion de borrado del usuario
    axios.delete("http://localhost:5000/api/user/"+id)
    .then(function(response){
      if(response.status === 200){
        console.log("Todo salio de forma correcta al borrar el usuario");
        //Aqui implementar la peticion del ID del usuario
        setUsers((cards) => cards.filter(e => e._id !== id));
      }else{
        console.log("Error al borrar al usuario ", response.status);
      }
    });
  }

  //Funcion para actualizar el grid de las cards
  function editUser(card){
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

  function addComent(id){

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

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item key={user.id}>
            {/*Aqui accederiamos a la clase notas*/}
            <CardUser
              user={user}
              removeUser={removeUser}
              editUser={editUser}
              addComent={addComent}
              mode="User"
            >
            </CardUser>
          </Grid>
        ))}
      </Grid>
      <Footer/> 
    </Box>

   
  );
}

export default UsuarioVista
