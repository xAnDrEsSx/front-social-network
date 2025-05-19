export interface ResponseApi {
    status: number;
    data?: any;
    errors?: string[];
}

export function concatenateErrors(response: ResponseApi): string {
    if (response.data?.errors && response.data?.errors.length > 0) {
        return response.data?.errors.join(", ");
    }
    if (response.status != 200 && response.status != 201) {
        switch (response.status) {
            case 400:
                return "Error en la solicitud, recarga la página por favor."
            case 401:
                return "Inicia sesión para realizar esta acción."
            case 403:
                return "No cuentas con el permiso necesario para realizar esta acción."
            case 404:
                return "El recurso solicitdo no existe."
            case 500:
                return "Existe un error interno en el servidor."
        }
    }
    return "";
}