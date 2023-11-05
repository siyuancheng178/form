import { useState } from "react";
import Stepper from "./components/Stepper";
import { UseContextProvider } from "./contexts/StepperContext";

import Company from "./components/steps/Company";
import FinRatio from "./components/steps/FinRatio";
import News from "./components/steps/News";
import Final from "./components/steps/Final";
import Additional from "./components/steps/Additional";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const steps = [
    "Company Selection",
    "Fin Ratio Selection",
    "News Selection",
    "Additional Information",
    "Result"
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Company nextStep={nextStep}/>;
      case 2:
        return <FinRatio prevStep={prevStep} nextStep={nextStep}/>;
      case 3:
        return <News prevStep={prevStep} nextStep={nextStep}/>;
      case 4:
        return <Additional prevStep={prevStep} nextStep={nextStep}/>;
      case 5:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="scroll-px-3 bg-white h-screen">
      <div className="horizontal container mx-auto w-1/2">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
