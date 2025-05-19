import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
    showDialog: boolean
    setShowDialog: (visible: boolean) => void
}

export const useDialogStore = create<State>()(devtools((set, get) => ({
    showDialog: false,
    setShowDialog: (visible: boolean) => set((state) => ({
        ...state,
        showDialog: visible
    }),
        false,
        'MostrarDialogo'),
    get
}), {
    name: 'sitio'
}));
