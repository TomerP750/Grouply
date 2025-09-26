import type { IconType } from "react-icons"
import { BiBarChart, BiShare, BiTimeFive, BiUserPlus } from "react-icons/bi"
import { FeatureCard } from "./FeatureCard"


export type FeatureData = {
    id: number
    icon: IconType
    title: string
    description: string
}

const featuresData: FeatureData[] = [
    {
        id: 1,
        icon: BiUserPlus,
        title: "Create & Join Groups",
        description:
            "Easily start your own study group or join existing ones that match your interests."
    },
    {
        id: 2,
        icon: BiShare,
        title: "Collaborative Sessions",
        description:
            "Share notes, tasks, and resources with your peers in real time."
    },
    {
        id: 3,
        icon: BiTimeFive,
        title: "Smart Scheduling",
        description:
            "Plan group sessions with calendar integration and automatic reminders."
    },
    {
        id: 4,
        icon: BiBarChart,
        title: "Track Progress",
        description:
            "Stay motivated with visual progress charts and milestones for your group projects."
    }
];

export function Features() {
    return (
        <div className="dark:text-white flex flex-col gap-10 items-center py-20 min-h-120">
            <div className="w-full flex flex-col items-center gap-25">

                <div className="flex flex-col items-center gap-8">
                    <p className="font-medium text-3xl sm:text-5xl">Designed for Collaboration</p>
                    <p className="w-3/4 text-sm sm:text-base sm:max-w-1/2 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi quis reiciendis, perferendis at libero atque illo rerum aspernatur amet consequatur aut. Perferendis illo consequatur, quasi dolor architecto impedit quas deserunt!</p>
                </div>
                <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-20 justify-items-center">
                    {featuresData.map(f => <FeatureCard key={f.id} feature={f} />)}
                </div>

            </div>


        </div>
    )
}