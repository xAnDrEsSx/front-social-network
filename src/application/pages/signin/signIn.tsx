import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { LoginForm as SignInForm } from '../../../components/public/signin/signIn';
import { useSesionStore } from "../../../infrastructure/store/sSession";
import "../../styles/signIn.css";
import { useSiteStore } from "../../../infrastructure/store/sSite";

const SignIn = () => {
    // const auth = useAuth();
    const { token, setSesion: setUsuario } = useSesionStore(state => state);


    const [isLoading, setIsLoading] = useState(false);
    const [usuarioField, setUsuarioField] = useState("");
    const [contrasenaField, setContrasenaField] = useState("");
    const [redirect, setRedirect] = useState(false);
    const setManagementVisited  = useSiteStore(state => state.setManagementVisited );

    useEffect(() => {
        // Verificar si el usuario está autenticado para redirigirlo al dashboard
        if (token) {
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
        await setUsuario(usuarioField, contrasenaField);
        setIsLoading(false);

    }

    return (
        <>
            <SignInForm
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                usuario={usuarioField}
                setUsuario={setUsuarioField}
                contrasena={contrasenaField}
                setContrasena={setContrasenaField}
                handleRestrictEvent={handleRestrictEvent}
            />
        </>
    )
};

export default SignIn;