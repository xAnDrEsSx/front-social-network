import Footer from "../../components/uiComponents/footer/footer";
import { AppLayoutProps } from "../../types/iAppLayout";

const HeroLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default HeroLayout;
