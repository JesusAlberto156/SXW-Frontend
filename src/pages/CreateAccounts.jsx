import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from '../../credentials/credentials';

import './CreateAccounts.css'
import Logo from "../../img/Logo-1.png"

function CreateAccounts () {  
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    
    const [showTextNombre, setShowTextNombre] = useState(false);
    const [showTextUsuario, setShowTextUsuario] = useState(false);
    const [showTextEmail, setShowTextEmail] = useState(false);
    const [showTextContraseña, setShowTextContraseña] = useState(false);

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingHome, setLoadingHome] = useState(false);
    const navigate = useNavigate();

    const form = useRef();

    const sendEmailBienvenida = async (e) => {
        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                user_name: nombre,
                user: usuario,
                user_email: email
            }, PUBLIC_KEY);
            console.log('SUCCESS!');
        } catch (error) {
            console.log('FAILED...', error);
        }
    };

    useEffect(() => {
        document.title = "SXW - CREAR CUENTA"
        toast("¡Bienvenido(a) a Sonido Xaviers Web!",{
            className: "toast-mensaje-informacion"
        });
        toast("¡Crea tu cuenta para acceder a la pagina principal!",{
            className: "toast-mensaje-informacion"
        });
    },[]);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const CrearCuenta = async () => {

        setLoadingHome(true);
        document.title = "Cargando...";
        await delay(1000)

        try {
            {/*--------NOMBRE--------*/}
            if(nombre == ""){
                document.title = "SXW - CREAR CUENTA"
                toast("¡Falta agregar el nombre completo!",{
                    className: "toast-mensaje-incorrecto"
                });
            }else if (!/^[a-zA-Z ]+$/.test(nombre)) {
                document.title = "SXW - CREAR CUENTA"
                setNombre("");
                toast("¡El nombre completo solo acepta letras y espacios sin acentos!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(nombre.length < 10){
                document.title = "SXW - CREAR CUENTA"
                setNombre("");
                toast("¡El nombre completo debe de tener mas de 10 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(nombre.length > 100){
                document.title = "SXW - CREAR CUENTA"
                setNombre("");
                toast("¡El nombre completo no debe de tener mas de 100 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(usuario == ""){{/*--------NOMBRE--------*/}{/*--------USUARIO--------*/}
                document.title = "SXW - CREAR CUENTA"
                toast("¡Falta agregar el nombre de usuario!",{
                    className: "toast-mensaje-incorrecto"
                });
            }else if (!/^[a-zA-Z0-9]+$/.test(usuario)) {
                document.title = "SXW - CREAR CUENTA"
                setUsuario("");
                toast("¡El nombre de usuario solo acepta letras y numeros sin acentos!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(usuario.length < 5){
                document.title = "SXW - CREAR CUENTA"
                setUsuario("");
                toast("¡El nombre de usuario debe de tener mas de 5 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(usuario.length > 20){
                document.title = "SXW - CREAR CUENTA"
                setUsuario("");
                toast("¡El nombre de usuario no debe de tener mas de 20 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(email == ""){{/*--------USUARIO--------*/}{/*--------EMAIL--------*/}
                document.title = "SXW - CREAR CUENTA"
                toast("¡Falta agregar el e-mail!",{
                    className: "toast-mensaje-incorrecto"
                });
            }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
                document.title = "SXW - CREAR CUENTA"
                setEmail("");
                toast("¡El email tiene que seguir el siguiente formato: ejemplo@dominio.com!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(contraseña == ""){{/*--------EMAIL--------*/}{/*--------CONTRASEÑA--------*/}
                document.title = "SXW - CREAR CUENTA"
                toast("¡Falta agregar la contraseña!",{
                    className: "toast-mensaje-incorrecto"
                });
            }else if(!/^[!@#$%^&*()_+][a-zA-Z0-9]+$/.test(contraseña)){
                document.title = "SXW - CREAR CUENTA"
                setContraseña("");
                toast("¡La contraseña debe iniciar con (!@#$%^&*()_+) y continuar con letras y numeros sin acentos!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(contraseña.length < 8){
                document.title = "SXW - CREAR CUENTA"
                setContraseña("");
                toast("¡La contraseña debe de tener mas de 8 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else if(contraseña.length > 30){
                document.title = "SXW - CREAR CUENTA"
                setContraseña("");
                toast("¡La contraseña no debe de tener mas de 30 caracteres!",{
                    className: "toast-mensaje-peligro",
                    autoClose: 6000
                });
            }else{{/*--------CONTRASEÑA--------*/}

                const verificarCorreo = await fetch(`http://localhost:3156/sxw/usuarios/verificar/correo/?email=${email}`)
            
                if (verificarCorreo.ok) { 

                    const verificarCuenta = await fetch(`http://localhost:3156/sxw/usuarios/verificar/cuenta/?email=${email}`)

                    if(!verificarCuenta.ok){

                        const datos = await verificarCorreo.json(); 
                        
                        if(datos.data.status == "invalid"){
                            document.title = "SXW - CREAR CUENTA"
                            toast("¡El correo electronico no existe!",{
                                className: "toast-mensaje-peligro",
                                autoClose: 6000
                            });
                        }else{
                            const insertarUsuario = await fetch("http://localhost:3156/sxw/usuarios/", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"

                                },
                                body: JSON.stringify({
                                    usuario:usuario,
                                    nombre:nombre,
                                    email:email,
                                    contraseña:contraseña,
                                    tipo: false 
                                })
                            });

                            const insertarCuenta = await fetch(`http://localhost:3156/sxw/usuarios/${email}?contraseña=${contraseña}`,{
                                method: "POST"
                            });

                            if (insertarUsuario.ok && insertarCuenta.ok) {
                                toast("¡Se creo la cuenta correctamente!",{
                                    className: "toast-mensaje-correcto",
                                    autoClose: 1000
                                });
                                await delay(2000);
                                sendEmailBienvenida();
                                navigate("/Inicio",{replace: true});
                                document.title = "SXW - INICIO";
                            } else {
                                const errorDataU = await insertarUsuario.json();
                                const errorDataC = await insertarCuenta.json();
                                document.title = "SXW - CREAR CUENTA"
                                toast(`Error: ${errorDataU.message} y ${errorDataC.message}`,{
                                    className: "toast-mensaje-incorrecto"
                                });    
                            }
                        }
                    }else{
                        document.title = "SXW - CREAR CUENTA"
                        toast("¡El email ya se encuentra registrado!",{
                            className: "toast-mensaje-peligro",
                            autoClose: 6000
                        });
                    }
                } else {
                    document.title = "SXW - CREAR CUENTA"
                    console.error("Error al verificar el correo:", verificarCorreo.status);
                }
            }
        } catch (error) {
            document.title = "SXW - CREAR CUENTA"
            console.error("Error al crear la cuenta:", error);
            toast("¡No es posible crear la cuenta!",{
                className: "toast-mensaje-incorrecto"
            });
        }

        setLoadingHome(false);

    };

    const IniciarSesion = async () => {
        setLoadingLogin(true);
        document.title = "Cargando...";
        await delay(1000);
        navigate("/",{replace: true});
        document.title = "SXW - INICIAR SESION";
        setLoadingLogin(false);
    };

    return(
        
        <div className="fondo-createAccounts">

            <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnHover
            draggable
            limit={5}/>

            
            <div className='container menu-createAccounts'>
                <img src={Logo} alt="Logo de SXW" className="logo-menu-createAccounts"/>
                <p className="text-center fw-semibold titulo-menu-createAccounts">CREA TU CUENTA</p>
                {/*-----------------------------------CAMPO DE NOMBRE COMPLETO-----------------------------------*/}
                <div className="input-group mb-3 direccion-campo-createAccounts">
                    <div className="orientacion-campo-createAccounts">
                        <div id="inputNombreCompleto" className="entryarea">
                            <input type="text" required
                                value={nombre}
                                onClick={(e) => {
                                    e.target.style.color = "aqua"
                                    e.target.style.borderBottom = "2px solid aqua";
                                    setShowTextNombre(true);
                                }}
                                onBlur={(e) => {
                                    e.target.style.color = 'white';
                                    e.target.style.borderBottom = "2px solid white";
                                    e.target.nextSibling.style.color = "white";
                                    setShowTextNombre(false);
                                }}
                                onFocus={(e) => {
                                    e.target.nextSibling.style.color = "aqua";
                                }}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <label className="labelLine" for="myInput">Nombre</label>
                        </div>
                    </div>
                </div>
                {showTextNombre && (
                <p className="texto-emergente-campo-createAccounts">
                    Escribe tú nombre completo
                </p>
                )}
                {/*-----------------------------------CAMPO DE NOMBRE COMPLETO-----------------------------------*/}
                <div className="espacio-componentes-createAccounts-2"></div>
                {/*-----------------------------------CAMPO DE USUARIO-----------------------------------*/}
                <div className="input-group mb-3 direccion-campo-createAccounts">
                    <div className="orientacion-campo-createAccounts">
                        <div id="inputNombreUsuario" className="entryarea">
                            <input type="text" required
                                value={usuario}
                                onClick={(e) => {
                                    e.target.style.color = "aqua"
                                    e.target.style.borderBottom = "2px solid aqua";
                                    setShowTextUsuario(true);
                                }}
                                onBlur={(e) => {
                                    e.target.style.color = 'white';
                                    e.target.style.borderBottom = "2px solid white";
                                    e.target.nextSibling.style.color = "white";
                                    setShowTextUsuario(false);
                                }}
                                onFocus={(e) => {
                                    e.target.nextSibling.style.color = "aqua";
                                }}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                            <label className="labelLine" for="myInput">Usuario</label>
                        </div>
                    </div>
                </div>
                {showTextUsuario && (
                <p className="texto-emergente-campo-createAccounts">
                    Escribe tú nombre de usuario
                </p>
                )}
                {/*-----------------------------------CAMPO DE USUARIO-----------------------------------*/}
                <div className="espacio-componentes-createAccounts-2"></div>
                {/*-----------------------------------CAMPO DE CORREO-----------------------------------*/}
                <div className="input-group mb-3 direccion-campo-createAccounts">
                    <div className="orientacion-campo-createAccounts">
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
                <p className="texto-emergente-campo-createAccounts">
                    Escribe tú E-mail
                </p>
                )}
                {/*-----------------------------------CAMPO DE CORREO-----------------------------------*/}
                <div className="espacio-componentes-createAccounts-2"></div>
                {/*---------------------------------CAMPO DE CONTRASEÑA---------------------------------*/}
                <div className="input-group mb-3 direccion-campo-createAccounts">
                    <div className="orientacion-campo-createAccounts">
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
                <p className="texto-emergente-campo-createAccounts">
                    Escribe tú contraseña
                </p>
                )}
                {/*---------------------------------CAMPO DE CONTRASEÑA---------------------------------*/}
                <div className="espacio-componentes-createAccounts-1"></div>
                {loadingHome ? (
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div> 
                ) : (
                    <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal"
                        onClick={CrearCuenta}
                    >
                        Crear cuenta
                    </button>
                )
                }
                <div className="espacio-componentes-createAccounts-3"></div>
                {loadingLogin ? (
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    ) : (
                        <button className="btn btn-link" onClick={IniciarSesion}>Iniciar sesión</button>
                    )
                }    
            </div>
        </div>
    );
}

export default CreateAccounts;