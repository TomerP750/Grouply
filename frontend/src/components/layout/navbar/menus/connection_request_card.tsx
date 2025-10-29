import { toast } from "react-toastify";
import type { ConnectionRequestDTO } from "../../../../dtos/models_dtos/request_dto/connection_request_dto"
import connectionRequestService from "../../../../service/connection_request_service";
import { timeAgo } from "../../../../util/util_functions";
import { Avatar } from "../../../elements/Avatar";


const baseBtn = "cursor-pointer px-3 py-2 rounded-lg"

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
                <div className="flex items-center gap-2">
                    <Avatar size={30} user={sender}/>
                    <p className="text-sm">{sender.username} </p>
                </div>
                <p className="text-xs">{timeAgo(sentAt)}</p>
            </div>
            <div className="text-sm space-x-3">
                <button onClick={handleAccept} className={`${baseBtn} bg-green-600 hover:bg-green-500 text-white`}>Accept</button>
                <button onClick={handleDecline} className={`${baseBtn} bg-rose-600 hover:bg-rose-500 text-white`}>Decline</button>
            </div>
        </div>
    )
}