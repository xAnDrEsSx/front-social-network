import { useNavigate } from "react-router-dom";
import { SINGIN_PATHROUTE } from "../../../config/environments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useSesionStore } from "../../../infrastructure/store/sSession";
import { Props } from '../../../types/iNavigationText'
import { logOut } from '../logOut/logOut';


export const NavigationText = ({ main, handleLogOut }: Props) => {
    const token = useSesionStore(state => state.token);
    const navigate = useNavigate();

    const handleLog = logOut(navigate);

    return (
        <div>
            <div className={`font-semibold leading-6 text-gray-900 dark:text-white cursor-pointer p-3 rounded-b-md w-full ${!main ? 'hover:bg-gray-50 dark:hover:bg-gray-900 ' : ''}`}>
                {token ? (
                    <div className="text-red-600 dark:text-red-300" onClick={() => {handleLogOut(); handleLog(); }}>
                        Cerrar sesión <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                ) : (
                    <div className='text-indigo-600 dark:text-indigo-300' onClick={() => navigate(SINGIN_PATHROUTE)}>
                        Iniciar sesión <FontAwesomeIcon icon={faRightToBracket} />
                    </div>
                )}
            </div>
        </div>
    )
};