import axios from 'axios';
import { APISERVICE_URL } from '../../../config/environments';
import { ResponseApi } from '../../../utils/concatenateErrors';
import { UsuarioSesion } from '../../../types/store/iStoreSession';


const setNewPassword = async (usuario: UsuarioSesion, contrasenaNueva: string,) => {

    try {

        const response = await axios.put(`${APISERVICE_URL}/users/${usuario.id}`, {
            username: usuario.username,
            email: usuario.email,
            passwordHash: contrasenaNueva,
            birthDate: usuario.birthDate,
            firstName: usuario.firstName,
            lastName: usuario.lastName
        }, {
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}`,
            }
        });

        const data: ResponseApi = response.data;
        console.log(data)
        return data;

    } catch (error: any) {
        //console.log(error.response)
        return error.response;
    }
};

export { setNewPassword };
