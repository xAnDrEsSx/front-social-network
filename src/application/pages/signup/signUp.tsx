import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { useSesionStore } from "../../../infrastructure/store/sSession";
import "../../styles/signIn.css";
import { useSiteStore } from "../../../infrastructure/store/sSite";
import { RegistroForm as SignUpForm } from "../../../components/public/signup/signUp";

const SignUp = () => {
    // const auth = useAuth();
    const { token, createUser: createUser } = useSesionStore(state => state);

    const [isLoading, setIsLoading] = useState(false);
    const [usuarioField, setUsuarioField] = useState("");
    const [nombresField, setNombresField] = useState("");
    const [apellidosField, setApellidosField] = useState("");
    const [fechaNacimientoField, setFechaNacimientoField] = useState("");
    const [contrasenaField, setContrasenaField] = useState("");
    const [correoField, setCorreoField] = useState("");
    const [redirect, setRedirect] = useState(false);
    const setManagementVisited = useSiteStore(state => state.setManagementVisited);

    useEffect(() => {
        // Verificar si el usuario está autenticado para redirigirlo al dashboard
        if (!token) {
            setManagementVisited("/dashboard")
            setRedirect(true);
        }

        return () => {

        }
    }, [token]); // Escuchar cambios en el estado de autenticación

    if (redirect) {
        return <Navigate to="/dashboard" />;
    }

    function handleRestrictEvent(event: any) {
        event.preventDefault(); // Cancela el evento de copiar, cortar o pegar
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);
        var response = await createUser(token, nombresField, apellidosField, correoField, fechaNacimientoField, usuarioField, contrasenaField);
        setIsLoading(false);

        if (response?.createdAt != null) {
            setManagementVisited("/dashboard")
            setRedirect(true)
        }
        //console.log(response)
    }

    return (
        <>
            <SignUpForm
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                usuario={usuarioField}
                setUsuario={setUsuarioField}
                nombres={nombresField}
                setNombres={setNombresField}
                apellidos={apellidosField}
                setApellidos={setApellidosField}
                fechaNacimiento={fechaNacimientoField}
                setFechaNacimiento={setFechaNacimientoField}
                correo={correoField}
                setCorreo={setCorreoField}
                contrasena={contrasenaField}
                setContrasena={setContrasenaField}
                handleRestrictEvent={handleRestrictEvent}
            />
        </>
    )
};

export default SignUp;