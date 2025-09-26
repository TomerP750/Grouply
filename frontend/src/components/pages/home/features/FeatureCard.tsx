import type { FeatureData } from "./Features"


interface FeatureCardProps {
    feature: FeatureData
}

export function FeatureCard({ feature }: FeatureCardProps) {

    const Icon = feature.icon;

    return (
        <div className="w-full flex items-start gap-5">

            <div className="w-12 aspect-square rounded-xl bg-gradient-to-r from-indigo-500  to-indigo-600 flex items-center justify-center shrink-0">
                <Icon className="w-7 h-7 text-white" /> 
            </div>
            
            <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">{feature.title}</span>
                <span className="text-base w-full sm:w-3/4 dark:text-gray-300">{feature.description}</span>
            </div>
        </div>
    )
}