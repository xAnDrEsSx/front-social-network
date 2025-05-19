import axios from 'axios';
import { toast } from 'sonner';
import { APISERVICE_URL } from './environments';

// Flag to track whether a toast is currently displayed
let isToastDisplayed = false;

export const servicio = axios.create({ baseURL: APISERVICE_URL })

servicio.interceptors.response.use(
  response => {
    // If there was a toast, reset the flag indicating that a toast is displayed
    isToastDisplayed = false;
    return response;
  },
  error => {
    if (!isToastDisplayed) {
      if (error.response) {
        // Error handling logic
        const { status } = error.response;
        const mensaje = error.response.data?.error?.message;

        if (error?.response?.data.errors) {
          toast.error(error?.response?.data?.errors);
        } else {
          if (status === 400) {
            toast.error('Lo sentimos ha ocurrido un error en la petición. ' + mensaje);
          } else if (status === 401) {
            toast.error('Tu sesión ha caducado, inicia de nuevo por favor.');
          } else if (status === 403) {
            toast.info('¡Ups! No tienes permiso para consultar esta sección.');
          } else if (status === 404) {
            toast.error('El usuario no está registrado/activo en nuestra plataforma, contacta a un administrador por favor.');
          } else if (status === 500) {
            toast.error('Error en la validación de tus datos de sesión. ' /*+ mensaje*/);
          }
        }
      } else if (error.request) {
        // Error handling logic
        toast.error('Error en la solicitud, informa al administrador por favor. ' + error.request);
      } else {
        // Error handling logic
        toast.warning(error.message);
      }

      // Set flag to indicate that a toast is displayed
      isToastDisplayed = true;
    }

    return Promise.reject(error);
  }
);

servicio.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
