
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";
import { useSesionStore } from "../../../infrastructure/store/sSession";
import { usePostsStore } from "../../../infrastructure/store/sPosts";

export const logOut = (navigate: NavigateFunction) => {
    
    const setTokenValid = useSesionStore(state => state.setTokenValid);
    const cleanUsers = usePostsStore(state => state.cleanPosts);

    const LogOut = () => {
        toast.success("¡Cierre de sesión exitoso, Nos vemos pronto!");
        setTokenValid(false);
        cleanUsers();
        navigate('/');
    }

    return LogOut;
}