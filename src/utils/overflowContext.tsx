// OverflowContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

interface OverflowContextType {
    isOverflowHidden: boolean;
    setIsOverflowHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverflowContext = createContext<OverflowContextType | undefined>(undefined);

export const OverflowProvider = ({ children }: AppLayoutProps) => {
    const [isOverflowHidden, setIsOverflowHidden] = useState<boolean>(false);

    return (
        <OverflowContext.Provider value={{ isOverflowHidden, setIsOverflowHidden }}>
            {children}
        </OverflowContext.Provider>
    );
};

export const useOverflowContext = () => {
    const context = useContext(OverflowContext);
    if (!context) {
        throw new Error('useOverflowContext must be used within an OverflowProvider');
    }
    return context;
};
