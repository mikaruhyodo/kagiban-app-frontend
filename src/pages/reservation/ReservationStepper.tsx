import { Search, Calendar, Check } from 'lucide-react';

interface Step {
  label: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  { label: '鍵選択', icon: Search },
  { label: '貸出情報', icon: Calendar },
  { label: '内容確認', icon: Check },
];

interface ReservationStepperProps {
  currentStep: 1 | 2 | 3;
}

export default function ReservationStepper({ currentStep }: ReservationStepperProps) {
  return (
    <div className="bg-white border border-[#e5e8ed] rounded-xl p-6">
      <div className="flex items-center justify-center">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`flex items-center justify-center size-10 rounded-full ${
                  isCompleted ? 'bg-[#21c45e]' : isActive ? 'bg-[#2663eb]' : 'bg-[#e5e8ed]'
                }`}>
                  <step.icon size={20} className={isCompleted || isActive ? 'text-white' : 'text-[#8c949e]'} />
                </div>
                <span className={`text-[12px] font-medium whitespace-nowrap ${
                  isCompleted ? 'text-[#17a34a]' : isActive ? 'text-[#2663eb] font-semibold' : 'text-[#6b7380]'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-[100px] h-[2px] mb-6 mx-1 ${stepNum < currentStep ? 'bg-[#21c45e]' : 'bg-[#e5e8ed]'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
