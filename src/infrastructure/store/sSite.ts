import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

interface State {
    seeNav: boolean;
    managementVisited: string;
    showNav: (estado: boolean) => void
    setManagementVisited: (route: string) => void
}

export const useSiteStore = create<State>()(devtools(persist((set, get) => ({
    seeNav: true,
    managementVisited: "",
    showNav: (estado: boolean) => set((state) => ({
        ...state,
        seeNav: estado
    }),
        false,
        'GestionarNav'
    ),
    setManagementVisited: (route: string) => set((state) => ({
        ...state,
        managementVisited: route
    }),
        false,
        'AsignarRutaVisitada'
    ),
    get
}), {
    name: 'sitio'
})));