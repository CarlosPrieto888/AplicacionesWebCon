import * as React from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { DialogContent, DialogContentText, DialogTitle, Dialog, MenuItem, TextField } from '@mui/material';
import axios from "axios";

// IMP -> Preguntar ¿como recibir datos del Backend?

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "9%",
  maxHeight: "9%",
});

//Recibirá por aquí un props de la nota a añadir 
export function AdministradorVista(){
  
  const [users, setUsers] = React.useState([]);
  const [editCopia, setEditCopia] = React.useState([]); //Este hook es para actualizar el grid
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuBusqueda, setMenuBusqueda] = React.useState(false);

  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialogNormas = () => {
    setOpen(true);
  }

  const handleCloseDialogNormas = () => {
    setOpen(false);
  }
  
  const handleMenuBusq = () => {
    setMenuBusqueda(true);
  }

  const handleMenuBusqClose = () => {
    setMenuBusqueda(false);
  }

  //Función delvuelve un id de un usuario a partir de un DNI
  function getID(dni){
    console.log("parametro "+dni);
    //Buscamos si existe el dni
    let copia = [...users];
    let count = 0;
    let id = -1;
    for(let i = 0; i<copia.length; i++){
      if(copia[i].dni !== dni) count++;
    }

    //Si count === a la longitud del vector entonces existe el dni si no no
    if(count === copia.length){
      //Aqui implementar la peticion del ID del usuario
      console.log("axios "+dni);
      id = axios.get("http://localhost:5000/dni", {dni:dni})
      .then(function(response){
        if(response.status === 200){
          console.log("Todo salio de forma correcta al extraer el id");
        }else{
          console.log("Error al extraer el id ", response.status);
        }
      }).catch((e) => {
          console.error(e);
      });

    }else{
      throw new Error("Error el DNI no existe");
    }

    return id;
  }

  //Seguir mirando el metodo getID
  console.log(getID(12));

  //Persistencia de usuarios de la base de datos 
  function usuariosGrid(){
    //Aqui aniadir lo del axios hacer un get con todos los usuers de la base de datos
    let vector = axios.get("http://localhost:5000/user")
    .then(function(res, req){
      console.log("Recibiendo todos los usuarios");
    });
    //Insertamos cada usuario en la lista de usuarios
    for(let i = 0; i<vector.length; i++){
        setUsers(vector[i]);  //Preguntar esto 
    }
    console.log(users);
  }

  //usuariosGrid();

  function insertUser(nombre, apellido, direccion, dni, lugarNacimiento, trabajo, descripcionBreve, telefono){
    //Llamar antes a la funcion usuariosGrid para la persistencia de los datos

    // Almaceno la informacion de la nota en el array de cards.
    const copia = [...users];

    //Busco si existe alguna card con un mismo DNI ya que no podrá ser almacenada
    for(let i = 0; i<copia.length; i++){
      if(copia.dni === dni){
        console.error("No puede haber 2 o mas usuarios con un mismo DNI");
      }
    }

    //Insertamos la card
    copia.push({
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      dni: dni,
      lugarNacimiento: lugarNacimiento,
      trabajo: trabajo,
      descripcionBreve: descripcionBreve,
      telefono: telefono,
      fechaCreacion: Date.now(),
    });
    setUsers(copia);

    axios.post("http://localhost:5000/user", {nombre: nombre, apellido: apellido, direccion: direccion, dni: dni, lugarNacimiento: lugarNacimiento, trabajo: trabajo, descripcionBreve: descripcionBreve, telefono: telefono, fechaCreacion: Date.now()})
    .then(function(res, req){
      console.log("Todo ha salido bien");
    });
  }

  //Me sale el mismo error que antes el 400
  //insertUser("carlos", "prieto", "leon", "7", "leon", "uni", "prog", "uno");

  function removeUser(dni){
    //Aqui implementar la peticion del ID del usuario
    let id = getID(dni); //Aquí comprobamos si existe el dni y en caso de existir me devuelve el id
    setUsers((cards) => cards.filter(e => e.dni !== dni));
    //Aqui implementar la peticion de borrado del usuario
    axios.delete("http://localhost:5000/user", {id:id})
    .then(function(response){
      if(response.status === 200){
        console.log("Todo salio de forma correcta al borrar el usuario");
      }else{
        console.log("Error al borrar al usuario ", response.status);
      }
    });
  }

  //Funcion para actualizar el grid de las cards
  function updateUser(card){
    /*for(let i = 0; i<cards.length; i++){
      if(cards[i].id === card.id){
        cards[i].nombre = card.nombre;
        cards[i].apellido = card.apellido;
        cards[i].direccion = card.direccion;
        cards[i].dni = card.dni;
        cards[i].lugarNacimiento = card.lugarNacimiento;
        cards[i].trabajo = card.trabajo;
        cards[i].descripcionBreve = card.descripcionBreve;
        cards[i].telefono = card.telefono;
      }
    }*/
    //Implementar mejor esta forma 
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
          descripcionBreve: copia.descripcionBreve,
          telefono: copia.telefono,
          fechaCreacion: Date.now(),
        }
      }
    });
    setUsers(nuevaCopia);
    //Aqui obtengo el id del usuario
    let id = getID(nuevaCopia.dni);
    //Aquí aniadir para actualizar la base de datos con el axios
    axios.put("http://localhost:5000/user", {
      id: id,
      nombre: nuevaCopia.nombre,
      apellido: nuevaCopia.apellido,
      direccion: nuevaCopia.direccion,
      lugarNacimiento: nuevaCopia.lugarNacimiento,
      trabajo: nuevaCopia.trabajo,
      descripcionBreve: nuevaCopia.descripcionBreve,
      telefono: nuevaCopia.telefono,
      fechaCreacion: Date.now(),
    }).then(function(response){
      console.log("Se modificaron correctamente los cambios");
    });
  }

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
            IntroApp
          </Typography>

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu 
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
            keepMounted
            transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
            <MenuItem onClick={handleMenuBusq}>Buscar Usuario</MenuItem>
            <MenuItem onClick={handleClickOpenDialogNormas}>Normas de la Empresa</MenuItem>
            <MenuItem onClick={ e => navigate("/login") }>LogOut</MenuItem>
        
            <Dialog open={open} onClose={handleCloseDialogNormas}>
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

            <Dialog menuBusqueda={menuBusqueda} onClose={handleMenuBusqClose}>
                <DialogTitle>
                  Buscar un usuario a través de su DNI
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Inserte el DNI
                  </DialogContentText>
                  <TextField>
                    autoFocus
                    margin="dense"
                    id="dniBusq"
                    label="DNI a Buscar"
                    type="email"
                    fullWidth
                    variant="standard"
                  </TextField>
                </DialogContent>
            </Dialog>

          </Menu>

        </Toolbar>
      </AppBar>
      </Box>
   
  );
}

export default AdministradorVista;