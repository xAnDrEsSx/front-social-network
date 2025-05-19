export interface SignInFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    usuario: string;
    setUsuario: React.Dispatch<React.SetStateAction<string>>;
    contrasena: string;
    setContrasena: React.Dispatch<React.SetStateAction<string>>;
    handleRestrictEvent: (event: React.SyntheticEvent) => void;
    isLoading: boolean;
}