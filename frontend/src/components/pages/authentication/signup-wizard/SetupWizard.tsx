import { useWizardStep, WizardStepContextProvider } from "../../../../context/WizardStepContext"


export function SetUpWizard() {

    const { step, increment, decrement } = useWizardStep();

    return (
        <WizardStepContextProvider>
            <div>

            </div>
        </WizardStepContextProvider>
    )
}