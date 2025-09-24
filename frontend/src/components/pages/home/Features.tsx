import type { IconType } from "react-icons"
import { BiShare } from "react-icons/bi"
import { FeatureCard } from "./FeatureCard"


export type FeatureData = {
    id: number
    icon: IconType
    title: string
    description: string
}

const featuresData: FeatureData[] = [
    { id: 1, icon: BiShare, title: "title", description: "desc" },
    { id: 2, icon: BiShare, title: "title", description: "desc" },
    { id: 3, icon: BiShare, title: "title", description: "desc" },
    { id: 4, icon: BiShare, title: "title", description: "desc" },

]

export function Features() {
    return (
        <div className="dark:text-white flex flex-col gap-10 items-center py-20 min-h-120">
            <div className="w-full flex flex-col items-center gap-5">
                <p className="text-4xl sm:text-6xl">Title</p>
                <p className="w-3/4 text-sm sm:text-base sm:max-w-1/2 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quis reiciendis, perferendis at libero atque illo rerum aspernatur amet consequatur aut. Perferendis illo consequatur, quasi dolor architecto impedit quas deserunt!</p>

                <div className="w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
                    {featuresData.map(f => <FeatureCard key={f.id} feature={f} />)}
                </div>
            </div>


        </div>
    )
}