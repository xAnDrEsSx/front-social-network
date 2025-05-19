import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { InfinitySpin } from 'react-loader-spinner'
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { SignInFormProps } from '../../../types/iLogin';
import { SINGUP_PATHROUTE } from "../../../config/environments";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import back1 from '../../../application/assets/background/back1.jpg';
import back2 from '../../../application/assets/background/back2.jpg';
import back3 from '../../../application/assets/background/back3.jpg';

const SignInForm: React.FC<SignInFormProps> = ({ handleSubmit, usuario, setUsuario, contrasena, setContrasena, handleRestrictEvent, isLoading }) => {
  const [randomImage, setRandomImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let randomNumber = Math.round(Math.floor(Math.random() * 3) + 1);
    const newImage = `back${randomNumber}`;
    setRandomImage(newImage);
    setTimeout(() => {
      setIsFadingOut(false);

      switch (newImage) {
        case "back1":
          setBackImage(back1);
          break;
        case "back2":
          setBackImage(back2);
          break;
        case "back3":
          setBackImage(back3);
          break;
      }
    }, 100);
  }, [])

  useEffect(() => {
    setIsValid(usuario != null && usuario != "" && contrasena != null && contrasena != "")
  }, [usuario, contrasena])

  return (
    <div className="lg:flex justify-center justify-items-center dark:bg-gray-900 h-full min-h-[100vh]">

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-[100vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <div className="cursor-pointer flex items-center justify-center">
            </div>
          </Link>
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-indigo-600 dark:text-indigo-500">
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="new-password" >
            <div>
              <div className="flex justify-start items-center gap-2 text-gray-600 text-lg">
                <FontAwesomeIcon icon={faCircleUser} />
                <div className=" font-bold tracking-wide">
                  Usuario
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="" autoFocus required autoComplete="new-password"
                  className="pl-2 w-full text-xl py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="flex justify-start items-center gap-2 text-gray-600 text-lg">
                  <FontAwesomeIcon icon={faKey} />
                  <div className="font-bold tracking-wide">
                    Contraseña
                  </div>
                </div>
              </div>
              <div className="mt-1 relative">
                <input
                  name="contrasena"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  autoComplete="new-password"
                  onCopy={handleRestrictEvent}
                  onCut={handleRestrictEvent}
                  onPaste={handleRestrictEvent}
                  onDragStart={handleRestrictEvent}
                  className="pl-2 w-full text-xl py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="mt-10 flex-1 flex-wrap">
              <i className={!isLoading ? 'hidden' : "!-mt-1 absolute visible"}><InfinitySpin width="120" color="gray" /></i>
              <button type="submit" disabled={isLoading || !isValid} className={((!isLoading || !isValid) ? "cursor-pointer" : "pointer-events-none cursor-default") + ` max-h-20 bg-indigo-500 text-gray-100 p-2.5 w-full rounded-full tracking-wide font-semibold font-display hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-lg disabled:bg-gray-300 disabled:text-gray-900 text-xl`}>
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            ¿No tienes cuenta? <Link className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600" to="/">Ir a inicio</Link>
          </p>
          {/* <p className="mt-5 text-center text-md text-gray-500">
            <Link className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600" to="/">Ir al inicio</Link>
          </p> */}
        </div>
      </div>

      <LoginBackground style={{ backgroundImage: `url(${backImage})` }} className={randomImage + `${isFadingOut ? ' fade-out' : ''}`} $loginbackgroundimage="" />

    </div>
  );
};


const LoginBackground = styled.div<{ $loginbackgroundimage: string }>`
//   display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d6e4ff;
    flex: 1;
    min-height: 100vh;
    background-size: cover;
    //background-image: url('${props => props.$loginbackgroundimage}');

    transition: opacity 3s ease; // Transición de opacidad durante 1 segundo
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

/*
export default function LoginBackground() {
    return (
      <div className={`hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen bg-cover
          after:relative after:z-1 after:w-full after:min-h-screen after:absolute after:inset-0 after:bg-blue-500 after:opacity-50
          bg-[url('https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]`}>
      </div>
    )
};
*/

export { SignInForm as LoginForm };