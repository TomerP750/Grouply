import type { ConnectionRequestDTO } from "../../../../dtos/models_dtos/request_dto/connection_request_dto"


const baseBtn = "cursor-pointer px-3 py-2 rounded-lg text-white"

interface ConnectionRequestCardProps {
    connectionRequest: ConnectionRequestDTO;
    onResponse?: () => void;
}

export function ConnectionRequestCard({ connectionRequest, onResponse }: ConnectionRequestCardProps) {

    const { recipient, sender, sentAt } = connectionRequest;

    const handleAccept = () => {
        
    };

    const handleDecline = () => {

    };

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <p className="text-sm">{sender.username} </p>
                <p className="text-xs">20 mins ago</p>
            </div>
            <div className="text-sm space-x-3">
                <button onClick={handleAccept} className={`${baseBtn} bg-green-600 hover:bg-green-500`}>Accept</button>
                <button onClick={handleDecline} className={`${baseBtn} `}>Decline</button>
            </div>
        </div>
    )
}