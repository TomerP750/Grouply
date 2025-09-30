import type { FeatureData } from "./Features"


interface FeatureCardProps {
    feature: FeatureData
}

export function FeatureCard({ feature }: FeatureCardProps) {

    const Icon = feature.icon;

    return (
        <div className="w-full flex items-start gap-5 p-5">

            <div className="w-12 aspect-square rounded-xl bg-gradient-to-r from-teal-500  to-teal-600 flex items-center justify-center shrink-0">
                <Icon className="aspect-square text-white" size={30} /> 
            </div>
            
            <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">{feature.title}</span>
                <span className="text-base w-full sm:w-3/4 dark:text-gray-300">{feature.description}</span>
            </div>
        </div>
    )
}