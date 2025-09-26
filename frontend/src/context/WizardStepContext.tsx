import { useContext, createContext, useState, type ReactNode } from "react";

type WizardStepState = {
    step: number
};

type WizardStepValue = WizardStepState & {
    increment: () => void,
    decrement: () => void 
};

export const WizardStepContext = createContext<WizardStepValue | undefined>(undefined);

interface WizardStepProviderProps {
    children: ReactNode;
};

export function WizardStepContextProvider({ children }:WizardStepProviderProps) {
    
    const [step, setStep] = useState<number>(1);

    const increment = () => {
        setStep(prev => prev + 1);
    }

    const decrement = () => setStep(prev => Math.max(1, prev - 1));

    
    const ctx = {step, increment, decrement}; 

    return (
        <WizardStepContext.Provider value={ctx}>
            {children}
        </WizardStepContext.Provider>
    )
}


export function useWizardStep() {
    const ctx = useContext(WizardStepContext);
    if (!ctx) {
        throw new Error("useWizardStep must be used within WizardStepContextProvider")
    }
    return ctx;
}
