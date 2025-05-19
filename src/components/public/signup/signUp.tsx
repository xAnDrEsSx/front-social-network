import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { InfinitySpin } from 'react-loader-spinner';
import { faUser, faEnvelope, faCalendar, faCircleUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SINGIN_PATHROUTE } from "../../../config/environments";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import back1 from '../../../application/assets/background/back1.jpg';
import back2 from '../../../application/assets/background/back2.jpg';
import back3 from '../../../application/assets/background/back3.jpg';

const SignUpForm = ({ handleSubmit, nombres, setNombres, apellidos, setApellidos, fechaNacimiento, setFechaNacimiento, usuario, setUsuario, correo, setCorreo, contrasena, setContrasena, handleRestrictEvent, isLoading }) => {
  const [randomImage, setRandomImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let randomNumber = Math.round(Math.floor(Math.random() * 3) + 1);
    const newImage = `back${randomNumber}`;
    setRandomImage(newImage);
    setTimeout(() => {
      setIsFadingOut(false);
      switch (newImage) {
        case "back1": setBackImage(back1); break;
        case "back2": setBackImage(back2); break;
        case "back3": setBackImage(back3); break;
      }
    }, 100);
  }, []);

  useEffect(() => {
    setIsValid(
      nombres && apellidos && fechaNacimiento && usuario && correo && contrasena
    );
  }, [nombres, apellidos, fechaNacimiento, usuario, correo, contrasena]);

  return (
    <div className="lg:flex justify-center dark:bg-gray-900 h-full min-h-[100vh]">
      <Background style={{ backgroundImage: `url(${backImage})` }} className={randomImage + `${isFadingOut ? ' fade-out' : ''}`} $backgroundImage="" />

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-h-[100vh]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-indigo-600 dark:text-indigo-500">
            Crear cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-4">
              <InputField name="nombre_" label="Nombres" value={nombres} onChange={setNombres} icon={faUser} restrict={null} />
              <InputField name="apellidos_" label="Apellidos" value={apellidos} onChange={setApellidos} icon={faUser} restrict={null} />
              <InputField name="fechaNacimiento_" label="Fecha de nacimiento" type="date" value={fechaNacimiento} onChange={setFechaNacimiento} icon={faCalendar} restrict={null} />
              <InputField name="usuario_" label="Usuario" value={usuario} onChange={setUsuario} icon={faCircleUser} restrict={null} />
              <InputField name="correo_" label="Correo electrónico" type="text" value={correo} onChange={setCorreo} icon={faEnvelope} restrict={null} />
              <InputField name="ccontrasena_" label="Contraseña" type="password" value={contrasena} onChange={setContrasena} icon={faKey} restrict={handleRestrictEvent} extraCss="pr-4" />
            </div>

            <div className="mt-10">
              <i className={!isLoading ? 'hidden' : "!-mt-1 absolute visible"}><InfinitySpin width="120" color="gray" /></i>
              <button type="submit" disabled={isLoading || !isValid} className={((!isLoading || !isValid) ? "cursor-pointer" : "pointer-events-none cursor-default") + ` max-h-20 bg-indigo-500 text-gray-100 p-2.5 w-full rounded-full tracking-wide font-semibold hover:bg-indigo-600 focus:outline-none shadow-lg disabled:bg-gray-300 disabled:text-gray-900 text-xl`}>
                Crear cuenta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-md text-gray-500">
            ¿Ya tienes cuenta? <a className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-600" onClick={(e) => navigate(SINGIN_PATHROUTE)}>Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type = "text", value, onChange, icon, restrict, name, extraCss = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const [error, setError] = useState("");

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-600 text-lg">
        <div className="w-6 flex justify-center">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="font-bold tracking-wide">{label}</div>
      </div>
      <div className="relative mt-2">
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onCopy={restrict}
          onCut={restrict}
          onPaste={restrict}
          onDragStart={restrict}
          required
          autoComplete="new-password"
          className={`pl-2 pr-10 w-full text-xl py-2 border-b ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-${error ? 'red-500' : 'indigo-500'} ` + extraCss}
          onInvalid={(e) => {
            e.preventDefault(); // evita el mensaje nativo
            if (type === "email") setError("Correo electrónico no válido");
          }}
          onInput={() => {
            if (error) setError("");
          }}
          onBlur={() => {
            if (name === "correo_") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                setError("Correo electrónico no válido");
              }
            }
          }}
        />
        {error && (<p className="mt-1 text-sm text-red-500">{error}</p>)}
        {isPassword && (
          <button
            type="button"
            className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
};

const Background = styled.div<{ $backgroundImage: string }>`
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d6e4ff;
    flex: 1;
    min-height: 100vh;
    background-size: cover;
    transition: opacity 3s ease;
    opacity: .8;
    background-position-x: center;
    &::after {
      content: "";
      width: 100%;
      min-height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(145deg, #2e00ff, #3b82f6);
      opacity: 0.5;
    }
  }
`;

export { SignUpForm as RegistroForm };
