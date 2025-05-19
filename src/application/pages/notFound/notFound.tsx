import { Link } from "react-router-dom"
import styled from 'styled-components';
import back1 from '../../assets/background/back1.jpg'

export default function NotFound() {
    return (
        <>
            <div className="lg:flex justify-center h-full w-full min-h-full">

                <Background className="w-1/2" $backgroundImage={back1} />
                <div
                    className="mr-32 absolute inset-x-0 z-11 transform-gpu blur-3xl -top-[20em]"
                    aria-hidden="true">
                    <div
                        className="left-[calc(100%-21rem)] aspect-[1155/678] w-[21.125rem] -translate-x-96 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(100%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <section className="flex min-h-full h-full place-items-center lg:w-1/2 bg-white px-6 py-24 sm:py-32 lg:px-8 justify-center align-middle dark:bg-gray-950">
                    <div className="text-center h-full">
                        <div className="flex lg:flex-1 justify-center">
                      
                        </div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-indigo-600">Página no encontrada</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/"
                                className="z-50 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Ir a inicio
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}


const Background = styled.div<{ $backgroundImage: string }>`
//   display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d6e4ff;
    flex: 1;
    min-height: 100vh;
    background-size: cover;
    background-image: url('${props => props.$backgroundImage}');

    transition: opacity 1s ease; /* Transición de opacidad durante 1 segundo */
    opacity: .8;
    //animation: zoomInOut 5s infinite alternate;

    background-position-x: center;
    &::after {
      content: "";
      width: 100%;
      min-height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      //background-color: #3b82f6;

      background: linear-gradient(145deg, #2e00ff, #3b82f6);
      opacity: 0.5;
    }
  }  
  @keyframes zoomInOut {    
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
`;

