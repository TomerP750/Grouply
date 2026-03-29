interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

export function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
  const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const progress = (safeStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-300">
        <span>Step {safeStep}</span>
        <span>{totalSteps} total</span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
