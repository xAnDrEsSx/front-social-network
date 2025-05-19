import { lazy, Fragment, Suspense, ElementType } from "react";
import { Route, Outlet } from "react-router-dom";

import { SINGIN_PATHROUTE } from "../../config/environments";
import { SINGUP_PATHROUTE } from "../../config/environments";
import Loader from "../../components/uiComponents/loader/loader";
import { RouteProps } from '../../types/routes/iRoutes'

const loadIndex = () => import("../../application/pages/index/index");
// const loadManagementClients = () => import("../../application/pages/management/managementClients");
// const loadManagementTickets = () => import("../../application/pages/management/managementTickets");
// const loadManagementUsers = () => import("../../application/pages/management/managementUsers");
const HeroLayout = lazy(() => import("../../application/layouts/heroLayout"));

export const renderRoutes = (routes: RouteProps[]) => {
    return routes.map((route, index) => {
        const Component: ElementType = route.element || Fragment;
        const Layout = route.layout || Fragment;
        const Guard = route.guard || Fragment;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Suspense fallback={<Loader />}>
                        <Guard>
                            <Layout>{route.children ? <Outlet /> : <Component />}</Layout>
                        </Guard>
                    </Suspense>
                }
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};

export const routes: RouteProps[] = [
    //public routes
    {
        layout: HeroLayout,
        children: [
            {
                path: "/",
                element: lazy(async () => await import("../../application/pages/hero/hero"))
            }
        ]
    },
    {
        path: SINGIN_PATHROUTE,
        element: lazy(async () => await import("../../application/pages/signin/signIn")),
    },


    // protected without layout
    {
        layout: lazy(async () => await import("../../application/layouts/dashboardLayout")),
        guard: lazy(async () => await import("../../guards/authGuard")),
        children: [
            {
                path: "/dashboard",
                element: lazy(loadIndex),
            },
            {
                path: `/${SINGUP_PATHROUTE}`,
                element: lazy(async () => await import("../../application/pages/signup/signUp")),
            },
//         {
//             path: "/administracion/clientes",
//             element: lazy(loadManagementClients),
//         },
//         {
//             path: "/administracion/boletas",
//             element: lazy(loadManagementTickets),
//         },
//         {
//             path: "/administracion/usuarios",
//             element: lazy(loadManagementUsers),
//         }
        ],
    },
    {
        path: "*",
        element: lazy(async () => await import("../../application/pages/notFound/notFound")),
    }
];
