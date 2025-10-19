import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { WizardStepContextProvider } from "../../../../context/WizardStepContext";
import { WizardContent } from "./WizardContent";
import type { SignUpRequestDTO } from "./Dtos/SignUpRequestDTO";



export function SignUpWizard() {


    const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequestDTO>();

    return (
        <WizardStepContextProvider initialStep={1} totalSteps={2}>
            <WizardContent />
        </WizardStepContextProvider>
    )
}