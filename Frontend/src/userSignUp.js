import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import { DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import UsuarioVista from "./usuarioVista";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [nombre, setNombre] = React.useState();
  const [apellido, setApellido] = React.useState();
  const [lugarNacimiento, setLuegarNacimiento] = React.useState();
  const [direccion, setDireccion] = React.useState();
  const [telefono, setTelefono] = React.useState();
  const [dni, setDni] = React.useState();
  const [trabajo, setTrabajo] = React.useState();
  const [descripcionPersonal, setDescripcionPersonal] = React.useState();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Variabeles y funciones para añadir un botón
  const [open, setOpen] = React.useState(false);
  const handleClickOpenButton = () => {
    setOpen(true);
  }
  const handleCloseButton = () => {
    setOpen(false);
  }
  //Variable creada para volver a la pantalla de inicio
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "lightblue" }}>
        <Toolbar>

          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            IntroApp
          </Typography>
          {auth && (
            <div>
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
                <MenuItem onClick={ e => navigate("/login") }>logout</MenuItem>
                <MenuItem onClick={ handleClickOpenButton }>Normas Empresa</MenuItem>

                <Dialog open={open} onClose={handleCloseButton}>
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

              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        disable
      >

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Nombre"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            onChange={(e) => {setNombre(e.trajet.value)}}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Apellidos"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            variant="standard"
            onChange={(e) => {setApellido(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Direcion"
            onChange={(e) => {setDireccion(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Trabajo"
            onChange={(e) => {setTrabajo(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Numero Teléfono"
            onChange={(e) => {setTelefono(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="Lugar nacimiento"
            onChange={(e) => {setLuegarNacimiento(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
            id="outlined-required"
            label="DNI"
            onChange={(e) => {setDni(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="standard"
            id="outlined-required"
            sx={{ width: "60ch"}}
            label="Descripcion Personal"
            onChange={(e) => {setDescripcionPersonal(e.trajet.value)}}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'right' }}>

          {/*<UsuarioVista
              nombre={nombre}
              apellido={apellido}
              direccion={direccion}
              dni={dni}
              lugarNacimiento={lugarNacimiento}
              trabajo={trabajo}
              descripcionPersonal={descripcionPersonal}
              telefono={telefono}
            >
          </UsuarioVista>*/}

          <Button 
            variant="contained" 
            endIcon={<SendIcon />}  
            sx={{ mt: 3, ml: 1 }} 
            onClick={e => navigate("./usuarioVista")}
          >
            Send
          </Button>
        </Box>

      </Box>
    </Box>

  );
}
