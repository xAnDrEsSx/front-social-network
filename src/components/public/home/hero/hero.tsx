import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSiteStore } from '../../../../infrastructure/store/sSite';
import { routes } from './routes';
import { NavigationText } from '../../../uiComponents/navigationText/navigationText';
import { useNavigate } from 'react-router-dom';
import { useSesionStore } from '../../../../infrastructure/store/sSession';
import { SINGIN_PATHROUTE } from "../../../../config/environments";
import PostsIcon from '../../../../application/assets/posts.svg';

export default function Hero() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const token = useSesionStore(state => state.token);
    const seeNav = useSiteStore(state => state.seeNav);
    const setManagementVisited = useSiteStore(state => state.setManagementVisited);



    const handleLogOut = () => {
        setMobileMenuOpen(false)
    };

    const scrollToTable = (href: string) => {

        setMobileMenuOpen(false)
        setTimeout(() => {

            if (href.includes("/")) {
                setManagementVisited(href)
                navigate(href);
            } else {
                const section = document.getElementById(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }

        }, 100);
    };

    return (
        <>
            <div className="main-content">
                <main className={` dark:bg-gray-950 dark:text-white w-full text-base flex justify-items-center min-h-full extendCover`}>
                    <section className=' w-full flex flex-wrap mb-12'>

                        <header className="inset-x-0 top-0 z-10 justify-around w-full -mb-80">
                            <nav className={`min-w-full flex justify-around items-center lg:px-8 text-base ` + (seeNav ? ' p-12 ' : ' p-4')} aria-label="Global">
                                <div className="w-full flex lg:flex-1 -ml-4 lg:ml-0 h-12 items-center">
                                    <img src={PostsIcon} alt="Posts Icon" className="h-8 w-auto" />
                                    <span className="text-zinc-900 dark:text-white font-semibold">MedinasBook</span>
                                </div>
                                <div className="flex lg:hidden">
                                    <button
                                        type="button"
                                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white cursor-pointer"
                                        onClick={() => setMobileMenuOpen(true)}>
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="hidden lg:flex lg:gap-x-12 z-50">
                                    {routes.map((item) => (
                                        (token || !item.protected) && (
                                            <a key={item.name}
                                                onClick={() => scrollToTable(item.href)}
                                                className="cursor-pointer text-base  font-semibold leading-6 text-gray-900 dark:text-white">
                                                {item.name}
                                            </a>
                                        )
                                    ))}
                                </div>
                                <div className="hidden lg:flex lg:flex-1 lg:justify-end mr-1.5">
                                    <NavigationText main={true} handleLogOut={handleLogOut} />
                                </div>
                            </nav>

                            <Dialog as="div" className="lg:hidden -z-50" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                                <div className="fixed inset-0 z-50" />
                                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-950 dark:text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
                                            onClick={() => setMobileMenuOpen(false)} >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flow-root">
                                        <div className="-my-6 divide-y text-gray-300 dark:text-gray-600">
                                            <div className="space-y-2 py-6">
                                                {routes.map((item) => (
                                                    (token || !item.protected) && (
                                                        <a
                                                            key={item.name}
                                                            onClick={() => scrollToTable(item.href)}
                                                            className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">
                                                            {item.name}
                                                        </a>
                                                    )
                                                ))}
                                            </div>
                                            <div className="pt-3 -ml-2">
                                                <NavigationText main={false} handleLogOut={handleLogOut} />
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Dialog>
                        </header>

                        <div className="isolate px-6 pt-0 lg:px-8 flex flex-wrap flex-auto justify-items-center z-40 mt-60">
                            <div className="mx-auto max-w-lg justify-items-center flex-auto flex-wrap items-center  xl:max-w-3xl z-40">
                                <br />
                                <div className="xs:mb-8 flex justify-center mb-4 z-40">
                                    <div className="cursor-default p-2 rounded-full px-3 py-1 text-base leading-6 text-gray-600 dark:text-white ring-2 ring-indigo-300/50 dark:ring-indigo-500/50 hover:ring-indigo-700/60">
                                        Prueba Técnica, funcionalidades básicas de red social
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">Comparte tus ideas y descubre lo que otros están pensando</h1>
                                    <p className="mt-6 text-base leading-8 text-gray-600 dark:text-white">Inicia sesión para publicar tus pensamientos, explorar lo que otros comparten y mostrar tu apoyo con un "me gusta". <strong className='text-gray-700 dark:text-indigo-300'>¡Simple, rápido y sin complicaciones!</strong></p>
                                    <div className="mt-10 flex items-center justify-center gap-x-6">
                                        <a onClick={() => navigate(SINGIN_PATHROUTE)} className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Explorar publicaciones</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

        </>
    );
}
