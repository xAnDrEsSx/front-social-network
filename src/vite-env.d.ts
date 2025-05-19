/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SINGIN_PATHROUTE: string
    readonly VITE_SINGUP_PATHROUTE: string
    readonly VITE_LOGINAPI_SERVICE: string
    readonly VITE_ENVIRONMENT: string
    readonly VITE_APISERVICE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}