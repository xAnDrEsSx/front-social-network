import NavBar from "../../components/uiComponents/navBar/navBar";
import { AppLayoutProps } from "../../types/iAppLayout";

import cop10 from '../assets/background/back1.jpg'

const ManagementLayout = ({ children }: AppLayoutProps) => {

    const backgroundImageUrl = cop10;

    return (
        <div className="min-h-screen flex flex-col w-full relative">
            <div className="fixed w-full shadow-md z-40">
                <NavBar />
            </div>
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-10 opacity-5" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            </div>
            <div className="flex-grow flex justify-center items-center w-full z-20">
                <div className="max-w-5xl w-full py-10 mt-16 pl-10 pr-10">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ManagementLayout;
