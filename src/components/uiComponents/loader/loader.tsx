import { useState, useEffect } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <>
            <main className="transition-opacity duration-1000 ease-linear bg-transparent flex justify-items-center justify-center h-screen align-middle overflow-hidden m-auto">
                {/* Aquí colocamos la condición para mostrar el spinner */}
                {showSpinner && (
                    <div
                        className="opacity-50 mr-32 absolute inset-x-0 top-10 z-11 transform-gpu blur-3xl sm:top-0"
                        aria-hidden="true"
                    >
                        <div
                            className="absolute ml-32 left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[190deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                )}
                <div className='m-auto'>
                    {/* El spinner se muestra solo cuando showSpinner es true */}
                    {showSpinner && <InfinitySpin width="180" color="#4F46E5" />}
                </div>
            </main>
        </>
    );
};

export default Loader;
