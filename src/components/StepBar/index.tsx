import { ReachBar } from "../ReachBar"

interface StepBarProps {
  currentStep: number;
  totalSteps: number;
}

const StepBar = ({ currentStep, totalSteps }: StepBarProps) => {
  return (
    <div className="w-full">
      <ReachBar value={currentStep / totalSteps} />
      <p className="text-right text-xs text-default pt-2">Passo {currentStep} de {totalSteps}</p>
    </div>
  )
}


export { StepBar }