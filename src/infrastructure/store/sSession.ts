/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unexpected-multiline */
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { UsuarioSesion as SessionStore, UsuarioSesion } from '../../types/store/iStoreSession';
import { toast } from 'sonner';
import { APISERVICE_URL, LOGINAPI_SERVICE } from '../../config/environments';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const useSesionStore = create<SessionStore>()(
    devtools
        (
            persist
                (
                    (set, get) => ({
                        id: "",
                        username: "",
                        email: "",
                        birthDate: "",
                        firstName: "",
                        lastName: "",
                        token: "",
                        tokenValid: false,
                        authorized: true,
                        createUser: async (token: string, firstName: string, lastName: string, email: string, birthDate: string, username: string, password: string) => {
                            try {

                                const response = await axios.post(`${APISERVICE_URL}/users`, {
                                    firstName,
                                    lastName,
                                    birthDate,
                                    username,
                                    email,
                                    passwordHash: password
                                }, {
                                    headers: {
                                        "accept": "text/plain",
                                        "Content-Type": "application/json",
                                         "Authorization": `Bearer ${token}`,
                                    }
                                });

                                const data = response.data;

                                if (data) {                                    
                                    toast.success(`¡El usuario ha sido creado exitosamente!`)
                                } else {
                                    toast.error('Error al crear el usuario, informa al administrador por favor.');
                                }

                                return data;

                            } catch (error: any) {
                                //console.log(error.response)
                                if ('errors' in error.response.data) {
                                    toast.error(error.response.data.errors.join(", "));
                                } else {
                                    toast.warning('Error en la solicitud. Por favor, intenta nuevamente más tarde.');
                                }
                            }
                        },
                        setSesion: async (username: string, password: string) => {
                            try {

                                //Paso 1: obtenemos token
                                const response = await axios.post(`${APISERVICE_URL}/${LOGINAPI_SERVICE}`, {
                                    username,
                                    password
                                }, {
                                    headers: {
                                        "accept": "text/plain",
                                        "Content-Type": "application/json"
                                    }
                                });

                                const token = response.data?.access_token;

                                if (token) {
                                    const decodedToken: any = jwtDecode(token);
                                    //console.log('Decoded Token:', decodedToken);

                                    //Paso 2: obtenemos información de usuario
                                    const getInfoUser = await axios.get(`${APISERVICE_URL}/users/${decodedToken.sub}`, {
                                        headers: {
                                            "accept": "text/plain",
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${token}`
                                        }
                                    });

                                    const infoUser = getInfoUser.data;

                                    if (infoUser) {
                                        const name = `${infoUser.firstName} ${infoUser.lastName}`;
                                        set((state) =>
                                        (
                                            {
                                                ...state,
                                                id: decodedToken.sub,
                                                username: infoUser.username,
                                                firstName: infoUser.firstName,
                                                lastName: infoUser.lastName,
                                                email: infoUser.email,
                                                birthDate: infoUser.birthDate,
                                                token: token,
                                                tokenValid: true,
                                                authorized: true
                                            }
                                        ),
                                            false,
                                            'IniciarSesion'
                                        );

                                        toast.success(`¡Hola ${name}! Nos alegra verte de nuevo. ¿Cuántos post realizarás hoy?`)
                                    } else {
                                        toast.error('Error al obtener información del usuario, informa al administrador por favor.');
                                    }

                                } else {
                                    toast.error('Error al iniciar sesión, informa al administrador por favor.');
                                }

                            } catch (error: any) {
                                //console.log(error.response)
                                if ('errors' in error.response.data) {
                                    toast.error(error.response.data.errors.join(", "));
                                } else {
                                    toast.warning('Error en la solicitud. Credenciales incorrectas.');
                                }
                            }
                        },
                        setTokenValid: (isValid: boolean) => {
                            // Función para actualizar el estado del token válido                            
                            set((state) =>
                            (
                                {
                                    ...state,
                                    id: "",
                                    username: "",
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    birthDate: "",
                                    token: "",
                                    authorized: false,
                                    tokenValid: isValid
                                }
                            ),
                                false,
                                'CerrarSesion'
                            );
                            get();
                        },
                        setAuthorized: (value: boolean) => {
                            // Función para actualizar el estado del token válido                            
                            set((state) =>
                            (
                                {
                                    ...state,
                                    authorized: value
                                }
                            ),
                                false,
                                'DenegarSeccion'
                            );
                        },
                        updateSesion: (props: SessionStore) => {
                            // Función para actualizar el estado del token válido                            
                            set((state) =>
                            (
                                {
                                    ...state,
                                    id: props.id,
                                    username: props.username,
                                    token: props.token,
                                    firstName: props.firstName,
                                    lastName: props.lastName,
                                    birthDate: props.birthDate,
                                    email: props.email,
                                    tokenValid: props.tokenValid
                                }
                            ),
                                false,
                                'CerrarSesion'
                            );
                        },
                    }), { name: 'usuario' }
                )
        )
);