import { useWizardStep } from "../../../../context/WizardStepContext";
import { SetupProfile } from "./steps/2_SetupProfile";
import { SignUp } from "./steps/1_Signup";



export function WizardContent() {
    
  const { step, increment, decrement } = useWizardStep();

  const getStepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <SignUp />;
      case 2:
        return <SetupProfile/>
      default:
        return <div>Unknown step</div>;
    }
  };

  
  return (
    <div className="">
    
      {getStepComponent(step)}

      
    </div>
  );
}

