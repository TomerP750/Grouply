import { useEffect, useState } from "react"
import type { ConnectionRequestDTO } from "../../../../dtos/models_dtos/request_dto/connection_request_dto";
import connectionRequestService from "../../../../service/connection_request_service";
import { toast } from "react-toastify";
import { ConnectionRequestCard } from "./connection_request_card";
import { BiGroup } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Menu } from "../../../elements/Menu";


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

    const handleResponse = (deletedId: number) => {
        setRequests(prev => prev.filter(r => r.id !== deletedId));
    };


    if (requests.length > 0) {

        return (
            <Menu>
                <div className="animate-[bounceUp_0.25s_ease-out_forwards] bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 py-5 px-4 absolute top-5 mt-15 right-25 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">
                    <div className="w-full flex min-h-64 flex-col">

                        {/* List */}
                        <div className="flex-1 overflow-y-auto gap-3 pr-1">
                            {requests.map(r => (
                                <ConnectionRequestCard
                                    key={r.id}
                                    connectionRequest={r}
                                    onResponse={() => handleResponse(r.id)}
                                />
                            ))}
                        </div>

                        <NavLink to="/" className="mt-3 text-sm self-center hover:underline">
                            View More
                        </NavLink>
                    </div>
                </div>
            </Menu>
        );

    }

    return (
        <Menu>
            <div className="animate-[bounceUp_0.25s_ease-out_forwards] bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center py-5 px-4 absolute top-2 mt-15 right-45 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">

                <menu className="w-full flex flex-col items-center">

                    <BiGroup size={40} />
                    <p className="text-sm text-center">No Pending Requests</p>

                </menu>
            </div>
        </Menu>
    )
}