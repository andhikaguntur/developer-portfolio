'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
    isDone: boolean;
    markAsDone: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isDone, setIsDone] = useState(false);

    const markAsDone = () => setIsDone(true);

    return (
        <LoadingContext.Provider value={{ isDone, markAsDone }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
