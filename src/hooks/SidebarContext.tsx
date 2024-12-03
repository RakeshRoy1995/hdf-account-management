// src/contexts/SidebarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface SidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

// Create the context with an initial undefined value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the type for the provider's children prop
interface SidebarProviderProps {
    children: ReactNode;
}

// Implement the SidebarProvider component
export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Create the custom hook for accessing the sidebar context
export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
