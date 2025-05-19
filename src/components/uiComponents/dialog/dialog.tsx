
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDialogStore } from '../../../infrastructure/store/sDialog';
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import { DialogProps } from '../../../types/iDialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { InfinitySpin } from 'react-loader-spinner';

// Usamos la interfaz DialogProps para tipar el componente Dialog
export default function Dialog({ status, titulo, children, mensajeToast, hasErrors, onAccept }: DialogProps) {

    const { setShowDialog } = useDialogStore(state => state);
    //const [showLocalDialog, setShowLocalDialog] = useState(status);
    const [inProgress, setInProgress] = useState(false);
    const [hasLocalErrors, setHasLocalErrors] = useState(true);

    useEffect(() => {
        setShowDialog(status);
    }, [status]);

    useEffect(() => {
        if (hasErrors != undefined && hasErrors != null)
            setHasLocalErrors(hasErrors);
    }, [hasErrors]);

    const handleCloseTicketData = async () => {
        let response: string = "";
        try {

            if(mensajeToast){
                
            }

            // Si onAccept (función) está definida se trata de un proceso
            if (onAccept && typeof onAccept === 'function') {
                setInProgress(true);
                response = await onAccept();
                setInProgress(false);

                if (response == "") {
                    setShowDialog(false);
                    toast.success("¡La acción se ha realizado exitosamente!");
                } else {
                    toast.warning(response)
                }

            } else {
                setShowDialog(false);
            }
            // Cierra el diálogo después de que la función haya terminado de ejecutarse
        } catch (error) {
            // Manejo de errores, si es necesario
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        // Verifica si la tecla presionada es "Enter" y si la función handleCloseTicketData está disponible
        if (event.key === 'Enter' && onAccept && typeof onAccept === 'function' && !inProgress && !hasLocalErrors) {
            //handleCloseTicketData();
        }
    };

    return (
        <div className='z-50 absolute' onKeyDown={handleKeyPress}>
            {/* {showLocalDialog ? ( */}
            <>
                <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none p-6 scale-100 transition-transform hover:scale-100 ml-2">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-xl shadow-xl relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-800">

                            {/*header*/}
                            <div className="flex items-center justify-start p-5 border-b border-solid border-gray-200 dark:border-gray-600 rounded-t">
                                <a className='text-3xl'><FontAwesomeIcon icon={faDiceD6} height={40} width={40} /></a>
                                <h3 className="text-2xl font-semibold ml-2">
                                    {titulo}
                                </h3>
                            </div>

                            {/*body*/}
                            <div className="p-6 flex w-full justify-items-center justify-center flex-wrap h-full overflow-y-auto z-40">
                                {children}
                            </div>

                            <div className='svgTicketLight dark:svgTicket max-h-[70%]'></div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-100 dark:border-gray-700 bg-gray-100 rounded-xl dark:bg-gray-800">

                                {inProgress && (
                                    <div className='mr-5'>
                                        <InfinitySpin width="100" color="#4F46E5" />
                                    </div>
                                )}

                                {onAccept &&
                                    (
                                        <button                                            
                                            className={`font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-5 bg-gray-700 text-white active:bg-gray-600`
                                                + ( inProgress ? " cursor-default pointer-events-none" : " cursor-pointer hover:bg-gray-800")
                                            }
                                            type="button"
                                            onClick={() => setShowDialog(false)}
                                        >
                                            Cancelar
                                        </button>
                                    )
                                }


                                <button
                                    className={
                                        (onAccept ?
                                            (
                                                (inProgress || hasLocalErrors) ?
                                                    'bg-gray-300 text-gray-800 pointer-events-none cursor-default'
                                                    :
                                                    'bg-indigo-600 text-white active:bg-indigo-600 hover:bg-indigo-700'
                                            )
                                            : `bg-indigo-600 text-white active:bg-indigo-600 hover:bg-indigo-700`)
                                        +
                                        ` font-bold text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer`
                                    }
                                    type="button"
                                    onClick={() => handleCloseTicketData()}
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
            </>
            {/* ) : null} */}
        </div>
    );
}