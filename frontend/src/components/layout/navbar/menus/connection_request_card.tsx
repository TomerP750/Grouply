import { toast } from "react-toastify";
import type { ConnectionRequestDTO } from "../../../../dtos/models_dtos/request_dto/connection_request_dto"
import connectionRequestService from "../../../../service/connection_request_service";
import { timeAgo } from "../../../../util/util_functions";


const baseBtn = "cursor-pointer px-3 py-2 rounded-lg text-white"

interface ConnectionRequestCardProps {
    connectionRequest: ConnectionRequestDTO;
    onResponse: () => void
}

export function ConnectionRequestCard({ connectionRequest, onResponse }: ConnectionRequestCardProps) {

    const { recipient, sender, sentAt } = connectionRequest;

    const handleAccept = () => {
        connectionRequestService.acceptRequest(sender.id)
            .then(() => {
                toast.success("Request accepted");
                // i will need to push notification to the sender
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                onResponse();
            })

    };

    const handleDecline = () => {
        connectionRequestService.declineRequest(sender.id)
            .then(() => {
                toast.success("Request Declined")
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                onResponse();
            })
    };

    return (
        <div className="even:bg-slate-800 p-2">
            <div className="flex justify-between items-center mb-3">
                <p className="text-sm">{sender.username} </p>
                <p className="text-xs">{timeAgo(sentAt)}</p>
            </div>
            <div className="text-sm space-x-3">
                <button onClick={handleAccept} className={`${baseBtn} bg-green-600 hover:bg-green-500`}>Accept</button>
                <button onClick={handleDecline} className={`${baseBtn} `}>Decline</button>
            </div>
        </div>
    )
}