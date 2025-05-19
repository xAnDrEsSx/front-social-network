import { Fragment, useEffect, useRef, useState } from 'react'; // Importa useRef para obtener una referencia al botón de apertura del menú
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logOut } from '../logOut/logOut';
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostsIcon from '../../../application/assets/posts.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCircleXmark, faRightToBracket, faSitemap, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useSiteStore } from '../../../infrastructure/store/sSite';

import { useSesionStore } from '../../../infrastructure/store/sSession';
import Dialog from '../dialog/dialog';

import { useDialogStore } from '../../../infrastructure/store/sDialog'
import InputPassword from '../inputs/password';
import ClassNames from '../../../utils/classNames';
import { concatenateErrors, ResponseApi } from '../../../utils/concatenateErrors';
import { setNewPassword } from '../../../infrastructure/services/users/setNewPassword';


interface NavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Crear Usuario', href: '/signup' },
    // { name: 'Publicar', href: "/post" }
];

export default function NavBar() {

    const { showDialog } = useDialogStore(state => state);
    const [status, setStatus] = useState(false);

    const [seeProfile, setSeeProfile] = useState(false);


    useEffect(() => {

        if (showDialog == false) {
            setStatus(false);
            setSeeProfile(false)
        }

        return () => {
            setContrasenaNueva("")
            setContrasenaConfirma("")
        };
    }, [showDialog]);

    const managementVisited = useSiteStore(state => state.managementVisited);
    const setManagementVisited = useSiteStore(state => state.setManagementVisited);


    const location = useLocation();
    const navigate = useNavigate();
    const disclosureButtonRef = useRef(null); // Referencia al botón de apertura del menú

    const usuario = useSesionStore(state => state);

    const [contrasenaNueva, setContrasenaNueva] = useState("");
    const [contrasenaConfirma, setContrasenaConfirma] = useState("");

    const [campoContrasenaOk, setCampoContrasenaOk] = useState("");
    const [hasErrors, setHasErrors] = useState(true);

    const [responseApi, setResponseApi] = useState<ResponseApi>({
        data: 0,
        status: 500,
        errors: [""]
    });

    const handleNavigationClick = (href: string) => {

        setManagementVisited(href);
        //Para gestionar cerrado de menú
        if (disclosureButtonRef.current !== null) {
            (disclosureButtonRef.current as HTMLElement).click(); // Asegurarse de que el botón existe antes de intentar simular el clic
        }
    };

    const handleInicio = () => {
        navigate('/');
    }

    const handlePerfil = () => {
        setSeeProfile(true);
    }

    const handleContrasena = () => {
        setStatus(true);
    }

    const cambiarContrasenaHandle = async () => {
        try {
            const response = await setNewPassword(usuario, contrasenaNueva);
            setResponseApi(response);
            console.log(response)

            if (response.status === true) {
                return '';
            }

            if (response.data != "" && response.data != null && !response.data?.errors)
                return response.data;

            return concatenateErrors(response);
        } catch (error: any) {
            console.error('Error setting new password:', error);
            return 'Error setting new password';
        }
    };


    //#region verificación confirmación contraseña
    useEffect(() => {
        if (contrasenaNueva != "" && contrasenaConfirma != "") {
            if (contrasenaNueva == contrasenaConfirma) {
                setCampoContrasenaOk("true")
            } else {
                setCampoContrasenaOk("false")
            }
        }
        return () => { };
    }, [contrasenaNueva, contrasenaConfirma]);
    //#end region

    //#region verificación de estado del formulario
    useEffect(() => {
        if (contrasenaNueva != "" && contrasenaConfirma != ""
            && contrasenaNueva == contrasenaConfirma) {
            setHasErrors(false);
        } else {
            setHasErrors(true);
        }
    }, [contrasenaNueva, contrasenaConfirma])
    //#end region

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800 w-full h-16 relative z-40">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden z-40">
                                    <Disclosure.Button ref={disclosureButtonRef} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none ">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <a onClick={() => { handleInicio(); }} className='cursor-pointer'>
                                            <img src={PostsIcon} alt="Posts Icon" className="h-8 w-auto" />
                                        </a>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={ClassNames(
                                                        item.href === managementVisited ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                                                    )}
                                                    onClick={() => handleNavigationClick(item.href)}
                                                    aria-current={location.pathname === item.href ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm cursor-pointer hover:text-amber-300">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <div className="text-3xl text-gray-500 hover:text-gray-300">
                                                    <FontAwesomeIcon icon={faCircleUser} className="w-full" />
                                                </div>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (

                                                        <a onClick={() => handlePerfil()}
                                                            className={ClassNames(active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 cursor-pointer hover:text-indigo-600')}
                                                        >
                                                            <FontAwesomeIcon icon={faUserCircle} />
                                                            <span className='ml-3'>
                                                                {usuario.firstName}
                                                            </span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <div className='flex flex-auto mx-auto w-full justify-center'>
                                                    <hr className='text-gray-300 dark:text-gray-600 w-[80%] mb-2 mt-2 text-center justify-center' />
                                                </div>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={"/"}
                                                            className={ClassNames(active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 cursor-pointer hover:text-indigo-600')}
                                                        >
                                                            <FontAwesomeIcon icon={faSitemap} />
                                                            <span className='ml-3'>
                                                                Página principal
                                                            </span>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <div className='flex flex-auto mx-auto w-full justify-center'>
                                                    <hr className='text-gray-300 dark:text-gray-600 w-[80%] mb-2 mt-2 text-center justify-center' />
                                                </div>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a onClick={() => handleContrasena()}
                                                            className={ClassNames(active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 cursor-pointer hover:text-indigo-600')}
                                                        >
                                                            <FontAwesomeIcon icon={faCircleXmark} />
                                                            <span className='ml-3'>
                                                                Cambiar contraseña
                                                            </span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            className={ClassNames(active ? 'bg-gray-100 dark:bg-gray-800' : '',
                                                                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 cursor-pointer hover:text-red-600 dark:hover:text-red-400')}
                                                            onClick={logOut(navigate)}
                                                        >
                                                            <FontAwesomeIcon icon={faRightToBracket} />
                                                            <span className='ml-3'>
                                                                Cerrar sesión
                                                            </span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 z-40 bg-gray-800">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={ClassNames(
                                            item.href === managementVisited ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
                                        )}
                                        onClick={() => { handleNavigationClick(item.href); }}
                                        aria-current={location.pathname === item.href ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {status ?
                (
                    <Dialog status={status} key={2}
                        titulo='Cambiar contraseña'
                        mensajeToast={responseApi.errors && (responseApi.errors.join(", ") || "")}
                        onAccept={cambiarContrasenaHandle}
                        hasErrors={hasErrors}
                    >
                        <div className='max-w-sm h-60 z-40'>
                            <div className=''>
                                <InputPassword
                                    hasFocus={false}
                                    key={"p2"}
                                    labelText='Nueva contraseña'
                                    value={contrasenaNueva}
                                    inputAddCss={campoContrasenaOk != "" ? (campoContrasenaOk == "true" ? "text-green-600" : "text-red-600") : ''}
                                    setContrasena={setContrasenaNueva}
                                    required={true}
                                />
                                <InputPassword
                                    hasFocus={false}
                                    key={"p3"}
                                    labelText='Confirma la nueva contraseña'
                                    value={contrasenaConfirma}
                                    inputAddCss={campoContrasenaOk != "" ? (campoContrasenaOk == "true" ? "text-green-600" : "text-red-600") : ''}
                                    setContrasena={setContrasenaConfirma}
                                    required={true}
                                />
                                <div className='h-0'></div>

                            </div>
                        </div>
                    </Dialog>
                ) : null
            }


            {seeProfile ? (
                <Dialog
                    status={seeProfile}
                    key={3}
                    titulo="Perfil de usuario"
                    mensajeToast={responseApi.errors && (responseApi.errors.join(", ") || "")}
                    onAccept={null}
                    hasErrors={null}
                >
                    <div className="min-w-2xs h-60 z-40 p-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <label htmlFor="username" className="w-60 font-semibold text-gray-700 dark:text-gray-300">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={usuario.username}
                                    readOnly
                                    className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="firstname" className="w-60 font-semibold text-gray-700 dark:text-gray-300">
                                    Nombres
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={usuario.firstName}
                                    readOnly
                                    className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="lastname" className="w-60 font-semibold text-gray-700 dark:text-gray-300">
                                    Apellidos
                                </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    value={usuario.lastName}
                                    readOnly
                                    className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="birthdate" className="w-60 font-semibold text-gray-700 dark:text-gray-300">
                                    Fecha nacimiento
                                </label>
                                <input
                                    type="text"
                                    name="birthdate"
                                    value={usuario.birthDate}
                                    readOnly
                                    className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label htmlFor="email" className="w-60 font-semibold text-gray-700 dark:text-gray-300">
                                    Correo electrónico
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={usuario.email}
                                    readOnly
                                    className="w-full px-2 py-1 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="h-0" />
                        </div>
                    </div>
                </Dialog>
            ) : null}

        </>
    )
}

