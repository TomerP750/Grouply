import { useEffect, useState } from "react";
import connectionRequestService from "../../../service/connection_request_service";
import type { ConnectionRequestDTO } from "../../../dtos/models_dtos/request_dto/connection_request_dto";
import { toast } from "react-toastify";


export function ConnectionRequestsPage() {
    
    const [requests, setRequests] = useState<ConnectionRequestDTO[]>([]);
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        connectionRequestService.allRequests(pageIndex, pageSize)
        .then(res => {
            setRequests(res.content);
            setTotalPages(res.totalPages);
        })
        .catch(err => {
            toast.error(err.response.data);
        })
    }, [pageIndex]);

    const handleAccept = () => {
        
    };

    const handleDecline = () => {

    };
    
    
    return (
        <div>

        </div>
    )
}