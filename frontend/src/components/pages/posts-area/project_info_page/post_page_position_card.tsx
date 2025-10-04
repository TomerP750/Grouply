import { useEffect, useState } from "react";
import type { ProjectPostPositionDTO } from "../../../../dtos/models_dtos/ProjectPostPositionDTO";
import joinRequestService from "../../../../service/JoinRequestService";
import { useUserSelector } from "../../../../redux/hooks";
import { JoinRequestDTO } from "../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { toast } from "react-toastify";
import { BiCheck } from "react-icons/bi";

interface PostPositionPageCardProps {
    postPosition: ProjectPostPositionDTO
    postId: number
    onApply?: () => void;
}

export function PostPositionPageCard({ postPosition, postId }: PostPositionPageCardProps) {

    const user = useUserSelector(state => state.authSlice.user);
    const [applied, setApplied] = useState<boolean>(false);

    useEffect(() => {
        joinRequestService.hasAppliedToPostPosition(postId, postPosition.id)
            .then(res => {
                setApplied(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    const [loading, setLoading] = useState<boolean>(false);


    const handleRequestToJoin = () => {

        if (user != null) {

            const joinRequest = new JoinRequestDTO(user.id, postPosition.id, postId);
            console.log(joinRequest);

            joinRequestService.toggleJoinRequest(joinRequest)
                .then((res) => {
                    if (res === false) {
                        toast.success("Request Removed!");
                    }
                    else {
                        toast.success("The request has been sent!")
                    };
                    setApplied(res);
                })
                .catch(err => {
                    toast.error(err.response.data)
                })
        }
    };

    return (
        <div className="w-full hover:bg-slate-700 py-2 cursor-pointer flex items-center justify-between px-3">
            <span className="text-teal-500">{postPosition.position}</span>
            <button
                onClick={handleRequestToJoin}
                className={`py-1 px-2 ${applied ? 'bg-green-600' : 'bg-blue-600'} rounded-lg cursor-pointer`}>
                {applied ? <BiCheck /> : 'Request to Join'}
            </button>
        </div>
    )
}