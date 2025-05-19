export interface UsuarioSesion {
    id: string
    username: string
    email: string
    birthDate: string
    firstName: string
    lastName: string
    token: string
    tokenValid: boolean; 
    authorized: boolean;    
    setSesion: (usuario: string, contrasena: string) => void
    setTokenValid: (isValid: boolean) => void
    setAuthorized: (value: boolean) => void
    updateSesion: (props: UsuarioSesion) => void
    createUser: (token: string, firstName: string, lastName: string, email: string, birthDate: string, username: string, password: string) => any
}