import { useState } from "react"
import { Accordion } from "../elements/Accordion"

export type FaqModel = {
    id: number
    question: string
    answer: string
}

const questionsData: FaqModel[] = [
    { id: 1, question: "question1", answer: "answer1" },
    { id: 2, question: "question2", answer: "answer1" },
    { id: 3, question: "question3", answer: "answer1" }
]

export function Faq() {

    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-10 bg-slate-900 min-h-120 p-20 items-center">
            <p className="text-white text-3xl sm:text-5xl font-bold">Frequently asked questions</p>
            <div className="flex flex-col items-center w-full gap-5">
                {questionsData.map(f =>
                    <Accordion
                        key={f.id}
                        isOpen={openId === f.id}
                        onToggle={() => setOpenId(openId === f.id ? null : f.id)}
                        faq={f} />
                )}
            </div>
        </div>
    )
}