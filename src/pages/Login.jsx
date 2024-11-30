import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import './Login.css'
import Logo from "../../img/Logo-1.png"

function Login () {  
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
    
  const [showTextEmail, setShowTextEmail] = useState(false);
  const [showTextContraseña, setShowTextContraseña] = useState(false);
  const [loadingCreateAccounts, setLoadingCreateAccounts] = useState(false);
  const [loadingHome, setLoadingHome] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "SXW - INICIAR SESIÓN"
    toast("¡Bienvenido(a) a Sonido Xaviers Web!",{
      className: "toast-mensaje-informacion"
    });
    toast("¡Inicia sesión para acceder a la pagina principal!",{
      className: "toast-mensaje-informacion"
    });
  },[]);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const CrearCuenta = async () => {
    setLoadingCreateAccounts(true);
    document.title = "Cargando...";
    await delay(1000);
    navigate("/CrearCuenta",{replace: true});
    document.title = "SXW - CREAR CUENTA";
    setLoadingCreateAccounts(false);
  };

  const IniciarSesion = async () => {

    setLoadingHome(true);
    document.title = "Cargando...";
    await delay(1000)
    
    try {
      {/*--------EMAIL--------*/}
      if(email == ""){
        document.title = "SXW - INICIAR SESIÓN"
        toast("¡Falta agregar el e-mail!",{
            className: "toast-mensaje-incorrecto"
        });
      }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        document.title = "SXW - INICIAR SESIÓN"
        setEmail("");
        toast("¡El email tiene que seguir el siguiente formato: ejemplo@dominio.com!",{
            className: "toast-mensaje-peligro",
            autoClose: 6000
        });
      }else if(contraseña == ""){{/*--------EMAIL--------*/}{/*--------CONTRASEÑA--------*/}
        document.title = "SXW - INICIAR SESIÓN"  
        toast("¡Falta agregar la contraseña!",{
            className: "toast-mensaje-incorrecto"
        });
      }else if(!/^[!@#$%^&*()_+][a-zA-Z0-9]+$/.test(contraseña)){
        document.title = "SXW - INICIAR SESIÓN"
        setContraseña("");
        toast("¡La contraseña debe iniciar con (!@#$%^&*()_+) y continuar con letras y numeros sin acentos!",{
            className: "toast-mensaje-peligro",
            autoClose: 6000
        });
      }else if(contraseña.length < 8){
        document.title = "SXW - INICIAR SESIÓN"
        setContraseña("");
        toast("¡La contraseña debe de tener mas de 8 caracteres!",{
            className: "toast-mensaje-peligro",
            autoClose: 6000
        });
      }else if(contraseña.length > 30){
        document.title = "SXW - INICIAR SESIÓN"
        setContraseña("");
        toast("¡La contraseña no debe de tener mas de 30 caracteres!",{
            className: "toast-mensaje-peligro",
            autoClose: 6000
        });
      }else{{/*--------CONTRASEÑA--------*/}
        
        const existeCuenta = await fetch(`http://localhost:3156/sxw/usuarios/existe/cuenta/?email=${email}`)
        
        if(existeCuenta.ok){

          const dato = await existeCuenta.json();
          
          if(dato.contraseña == contraseña){
            toast("¡Se inicio sesión correctamente!",{
              className: "toast-mensaje-correcto",
              autoClose: 1000
            });
            await delay(2000);
            navigate("/Inicio",{replace: true});
            document.title = "SXW - INICIO";
          }else{
            document.title = "SXW - INICIAR SESIÓN"
            toast("¡La contraseña no es correcta!",{
              className: "toast-mensaje-peligro",
              autoClose: 2000
            });
          }
        }else{
          document.title = "SXW - INICIAR SESIÓN"
          toast("¡La cuenta no existe!",{
            className: "toast-mensaje-incorrecto",
            autoClose: 2000
          });    
        }
      }
    } catch (error) {
      document.title = "SXW - INICIAR SESIÓN"
      console.error("Error al inciar sesion:", error);
      toast("¡No es posible iniciar sesion!",{
          className: "toast-mensaje-incorrecto"
      });
    }
    
    setLoadingHome(false);
    
  };


  return(
    <div className="fondo-login" >

      <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnHover
      draggable
      limit={5}/>

			<div className='container menu-login'>
        <img src={Logo} alt="Logo de SXW" className="logo-menu-login"/>
        <p className="text-center fw-semibold titulo-menu-login">INICIA SESIÓN CON TU CUENTA</p>
        {/*-----------------------------------CAMPO DE CORREO-----------------------------------*/}
        <div className="input-group mb-3 direccion-campo-login">
          <div className="orientacion-campo-login">
            <div id="inputEmail" className="entryarea">
              <input type="text" required
                value={email}
                onClick={(e) => {
                  e.target.style.color = "aqua"
                  e.target.style.borderBottom = "2px solid aqua";
                  setShowTextEmail(true);
                }}
                onBlur={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.borderBottom = "2px solid white";
                  e.target.nextSibling.style.color = "white";
                  setShowTextEmail(false);
                }}
                onFocus={(e) => {
                  e.target.nextSibling.style.color = "aqua";
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="labelLine" for="myInput">E-mail</label>
            </div>
          </div>
        </div>
        {showTextEmail && (
          <p className="texto-emergente-campo-login">
            Escribe tú E-mail
          </p>
        )}
        {/*-----------------------------------CAMPO DE CORREO-----------------------------------*/}
        <div className="espacio-componentes-login-2"></div>
        {/*---------------------------------CAMPO DE CONTRASEÑA---------------------------------*/}
        <div className="input-group mb-3 direccion-campo-login">
          <div className="orientacion-campo-login">
            <div id="inputPassword" className="entryarea">
              <input type="password" required
                value={contraseña}
                onClick={(e) => {
                  e.target.style.color = "aqua"
                  e.target.style.borderBottom = "2px solid aqua";
                  setShowTextContraseña(true);
                }}
                onBlur={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.borderBottom = "2px solid white";
                  e.target.nextSibling.style.color = "white";
                  setShowTextContraseña(false);
                }}
                onFocus={(e) => {
                  e.target.nextSibling.style.color = "aqua";
                }}
                onChange={(e) => setContraseña(e.target.value)}
              />
              <label className="labelLine" for="myInput">Contraseña</label>
            </div>
          </div>
        </div>
        {showTextContraseña && (
          <p className="texto-emergente-campo-login">
            Escribe tú contraseña
          </p>
        )}
        {/*---------------------------------CAMPO DE CONTRASEÑA---------------------------------*/}
        <div className="espacio-componentes-login-1"></div>
        {loadingHome ? (
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div> 
          ) : (
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal"
              onClick={IniciarSesion}
            >
              Iniciar sesión
            </button>
          )
        }
        <div className="espacio-componentes-login-3"></div>
        {loadingCreateAccounts ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          ) : (
            <button className="btn btn-link" onClick={CrearCuenta}>Crear cuenta</button>
          )
        }    
      </div>
		</div>
  );
}

export default Login;