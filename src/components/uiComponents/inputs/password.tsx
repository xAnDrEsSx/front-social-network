import { faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../../../application/styles/signIn.css';

export interface InputPasswordProps {
  hasFocus: boolean;
  labelText: string;
  value: string;
  inputAddCss: string;
  required: boolean;
  setContrasena: React.Dispatch<React.SetStateAction<string>>;
}

function handleRestrictEvent(event: any) {
  event.preventDefault(); // Cancela el evento de copiar, cortar o pegar
}

const InputPassword: React.FC<InputPasswordProps> = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='z-40 mt-8 flex justify-between flex-auto flex-wrap'>
      <div className="flex items-center justify-between">
        <div className="flex justify-start items-center gap-2 text-gray-600 dark:text-gray-400 text-lg">
          <FontAwesomeIcon icon={faKey} />
          <div className={`font-bold tracking-wide text-sm ` + (props.required && props.value == "" ? "text-red-400" : "")}>
            {props.labelText}{props.required ? " *" : ""}
          </div>
        </div>
      </div>
      <div className="mt-1 relative w-full">
        <input
          autoFocus={props.hasFocus ? true : false}
          type={showPassword ? 'text' : 'password'}
          name="contrasena"
          id="password"
          value={props.value}
          onChange={(e) => props.setContrasena(e.target.value)}
          autoComplete="new-password"
          required={props.required}
          onCopy={handleRestrictEvent}
          onCut={handleRestrictEvent}
          onPaste={handleRestrictEvent}
          onDragStart={handleRestrictEvent}
          className={`pl-2 w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 pr-8 ` +
            props.inputAddCss
          }
        />
        <div className='absolute inset-y-0 right-0 flex items-center px-2 text-gray-600 cursor-pointer'>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            title="ver/ocultar campo"
          />
        </div>
      </div>
    </div>
  );
}

export default InputPassword;