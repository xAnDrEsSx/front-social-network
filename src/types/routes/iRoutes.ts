
import { ElementType, JSX, LazyExoticComponent, ReactNode } from "react";

// Define las props para el diseño
interface AppLayoutProps {
    children: ReactNode;
    // Otras props que puedas necesitar
}

interface AuthGuardProps {
    children: ReactNode;
    // Otras props que puedas necesitar
}

// Define RouteProps con el tipo adecuado para element y layout
export interface RouteProps {
    path?: string;
    element?: ElementType | null | undefined; // Cambiar el tipo de element a ElementType
    layout?: LazyExoticComponent<({ children }: AppLayoutProps) => JSX.Element> | null | undefined;
    guard?: LazyExoticComponent<({ children }: AuthGuardProps) => JSX.Element> | null | undefined;
    children?: RouteProps[];
}