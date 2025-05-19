export interface DialogProps {
    status: boolean;
    titulo: string;
    children: React.ReactNode;
    mensajeToast?: string;
    hasErrors?: boolean;
    onAccept?: () => Promise<string>;    
}