import { useEffect, useState } from "react"
import type { ConnectionRequestDTO } from "../../../../dtos/models_dtos/request_dto/connection_request_dto";
import connectionRequestService from "../../../../service/connection_request_service";
import { toast } from "react-toastify";
import { ConnectionRequestCard } from "./connection_request_card";


export function ConnectionMenu() {

    const [requests, setRequests] = useState<ConnectionRequestDTO[]>([]);
    const pageSize = 5;
    

    useEffect(() => {
        connectionRequestService.allRequests(0, pageSize)
        .then(res => {
            setRequests(res.content);
        })
        .catch(err => {
            toast.error(err.response.data);
        })
    }, []);

    requests && console.log("reqs", requests)

    return (
        <menu className="p-3 w-full">

            {requests.map(r => {
                return <ConnectionRequestCard key={r.id} connectionRequest={r}/>
            })}

        </menu>
    )
}