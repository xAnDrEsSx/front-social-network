import { Navigate } from "react-router-dom";
import { useSesionStore } from "../infrastructure/store/sSession";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const usuario = useSesionStore(state => state);
  const [valid, setValid] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (!usuario?.token) {
      setTimeout(() => {
        setValid(false)
      }, 100);
    }

    return () => { };
  }, [usuario?.token]);

  useEffect(() => {
    if (!usuario?.authorized) {
      setIsAuthorized(false)
    }

    return () => { };
  }, [usuario?.authorized]);

  if (!isAuthorized) {
    //Hack para retornar y habilitar de nuevo 
    setIsAuthorized(true)
    usuario.setAuthorized(true);  
    return <Navigate to="/dashboard" />;
  }

  if (!valid) { 
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
