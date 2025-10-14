import { useState } from "react"

const baseBtn = "cursor-pointer px-3 py-2 rounded-lg text-white"

export function ConnectionMenu() {

    const [requests, setRequests] = useState();

    const handleAccept = () => {
        
    }

    const handleDecline = () => {

    }

    return (
        <menu className="p-3 w-full">

            <div className="flex justify-between items-center mb-3">
                <p className="text-sm">TheAdmin </p>
                <p className="text-xs">20 mins ago</p>
            </div>
            <div className="text-sm space-x-3">
                <button onClick={handleAccept} className={`${baseBtn} bg-green-600 hover:bg-green-500`}>Accept</button>
                <button onClick={handleDecline} className={`${baseBtn} `}>Decline</button>
            </div>


        </menu>
    )
}