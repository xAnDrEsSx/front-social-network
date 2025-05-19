import React, { useEffect, useRef } from 'react';
import '../../../application/styles/login.css';
import ClassNames from '../../../utils/classNames';

export interface SimpleInputProps {
    name: string;
    value: string | number;
    hasFocus: boolean;
    labelText: string;
    disabled?: boolean;
    inputAddCss?: string;
    labelAddCss?: string;
    divAddCss?: string;
    required?: boolean;
    type?: string;
    title?: string;
    setValue: React.Dispatch<React.SetStateAction<any>>;
}

const SimpleInput: React.FC<SimpleInputProps> = ({ ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;

        if (input && props.type === 'number') {
            const preventScroll = (e: WheelEvent) => {
                if (document.activeElement === input) {
                    e.preventDefault();
                }
            };

            input.addEventListener('wheel', preventScroll);

            return () => {
                input.removeEventListener('wheel', preventScroll);
            };
        }
    }, [props.type]);

    return (
        <div className={props.divAddCss}>
            <div className="flex items-center justify-between mt-0">
                <div className={`flex justify-start items-center gap-2 text-lg ` + props.labelAddCss}>
                    <div className={`font-bold tracking-wide text-sm ` + (props.required && props.value == "" ? "text-red-500" : "")}>
                        {props.labelText}{props.required ? " *" : ""}
                    </div>
                </div>
            </div>
            <div className="mt-1 flex justify-between w-[100%]">
                <input
                    ref={inputRef}
                    key={"genericInput" + props.name}
                    disabled={props.disabled}
                    autoFocus={props.hasFocus ? true : false}
                    type={props.type ? props.type : "textarea"}
                    name={props.name} value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                    required={props.required}
                    autoComplete="off"
                    title={props.title ? props.title : ""}
                    className={
                        ClassNames(`pl-2 w-[100%] text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500`,
                            (props.inputAddCss ?? ""),
                            (props.type === 'number' ? ' no-spinner ' : '') + ` mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md `
                        )}
                />
            </div>
        </div>
    );
}

export default SimpleInput;