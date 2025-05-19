import { useSesionStore } from "../../../infrastructure/store/sSession";
import Posts from "../../uiComponents/posts/posts";

export const Dashboard = () => {
    const { firstName: nombre } = useSesionStore(state => state);

    return (

        <article className="max-w-2xl px-6 py-2 mx-auto space-y-8 ">
            <div className="w-full mx-auto space-y-4 text-center">
                <h1 className="text-5xl font-bold leading-tight md:text-5xl text-gray-950 dark:text-indigo-500">Hola, {nombre}</h1>
            </div>
            <section className="dark:text-gray-200 text-center py-2">
                <Posts />
            </section>
        </article>
    );
}

export default Dashboard;
