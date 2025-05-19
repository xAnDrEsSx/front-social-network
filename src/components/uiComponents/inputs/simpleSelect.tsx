import React, { useEffect } from 'react';
import '../../../application/styles/login.css';

export interface SimpleSelectProps {
    name: string;
    value: string;
    hasFocus: boolean;
    labelText: string;
    labelAddCss?: string;
    divAddCss?: string;
    required?: boolean;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
}

const SimpleSelect: React.FC<SimpleSelectProps> = ({ ...props }) => {
    // Aquí utilizamos useEffect para realizar algún efecto secundario basado en cambios en las props
    useEffect(() => {
        // Por ejemplo, podríamos imprimir las opciones cada vez que cambien
        //console.log('Opciones actualizadas:', props.options);
    }, [props.options]); // Este efecto se ejecutará cada vez que props.options cambie

    return (
        <div className={props.divAddCss}>
            <div className="flex items-center justify-between mt-0">
                <div className={`flex justify-start items-center gap-2 text-lg ${props.labelAddCss}`}>
                    <div className={`font-bold tracking-wide text-sm ` + (props.required && props.value == "" ? "text-red-600 dark:text-red-400" : "")}>
                        {props.labelText}{props.required ? " *" : ""}
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-between w-[100%]">
                <select
                    className="cursor-pointer pl-2 w-full text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    value={props.value}
                    onChange={(e) => { e.preventDefault(); e.stopPropagation(); props.setValue(e.target.value) }}
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
                    required={props.required}
                    autoComplete='off'
                >
                    {props.options.map((option, index) => (
                        <option key={index} value={option} className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-900'>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SimpleSelect;
