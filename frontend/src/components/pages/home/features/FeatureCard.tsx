import type { FeatureData } from "./Features"


interface FeatureCardProps {
    feature: FeatureData
}

export function FeatureCard({ feature }: FeatureCardProps) {
    return (
        <div className="flex items-center gap-5">
            <feature.icon size={50} className="bg-indigo-500 rounded-xl p-2"/>
            <div className="flex flex-col">
                <span className="text-2xl">{feature.title}</span>
                <span className="text-sm">{feature.description}</span>
            </div>
        </div>
    )
}