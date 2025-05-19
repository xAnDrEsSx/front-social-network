/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { PostStore } from '../../types/store/iStorePosts';

import { toast } from 'sonner';
import { APISERVICE_URL } from '../../config/environments';
import axios from 'axios';

export const usePostsStore = create<PostStore>()(
    devtools(
        persist(
            (set, get) => (
                {
                    data: [],
                    getPosts: async (token: string) => {
                        try {

                            const response = await axios.get(`${APISERVICE_URL}/posts`, {
                                headers: {
                                    "accept": "text/plain",
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                }
                            });

                            const data = response.data;

                            if (data) {
                                set({ data: data });
                                get();
                                //toast.success(`Se han recuperado ${data.length} publicaciones`)
                            } else {
                                toast.error('Error al obtener las publicaciones, informa al administrador por favor.');
                            }

                        } catch (error: any) {
                            //console.log(error.response)
                            if ('errors' in error.response.data) {
                                toast.error(error.response.data.errors.join(", "));
                            } else {
                                toast.warning('Error en la solicitud. Por favor, intenta nuevamente más tarde.');
                            }
                        }
                    },
                    addPost: async (token: string, userId: string, message: string) => {
                        try {
                            const response = await axios.post(`${APISERVICE_URL}/posts`, {
                                userId,
                                message
                            }, {
                                headers: {
                                    "accept": "text/plain",
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                }
                            });

                            const data = response.data;

                            if (data) {
                                toast.success(`La publicación ha sido registrado exitosamente.`)
                            } else {
                                toast.error('Error al publicar, informa al administrador por favor.');
                            }
                        } catch (error: any) {
                            //console.log(error.response)
                            if ('errors' in error.response.data) {
                                toast.error(error.response.data.errors.join(", "));
                            } else {
                                toast.warning('Error en la solicitud. Por favor, intenta nuevamente más tarde.');
                            }
                        }
                    },
                    setLike: async (token: string, userId: string, postId: string) => {
                        try {
                            const response = await axios.post(`${APISERVICE_URL}/likes`, {
                                userId,
                                postId
                            }, {
                                headers: {
                                    "accept": "text/plain",
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                }
                            });

                            const data = response.data;

                            if (data) {
                                //toast.success(`La acción se ha completado exitosamente.`)
                            } else {
                                toast.error('Error al asignar me gusta, informa al administrador por favor.');
                            }
                        } catch (error: any) {
                            //console.log(error.response)
                            if ('errors' in error.response.data) {
                                toast.error(error.response.data.errors.join(", "));
                            } else {
                                toast.warning('Error en la solicitud. Por favor, intenta nuevamente más tarde.');
                            }
                        }
                    },
                    setPostsData: (props) => {
                        set((state) => ({ ...state, data: props.data })),
                            false,
                            'setPosts',
                            get();
                        return Promise.resolve();
                    },
                    cleanPosts: async () => {
                        set((state: PostStore) => ({ ...state, data: [] }),
                            false,
                            'resetPosts',
                        );
                    }
                }
            ), { name: 'posts' }
        )
    )
);