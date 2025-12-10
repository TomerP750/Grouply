import { BiGroup, BiCheck } from "react-icons/bi";
import { toTitleCase } from "../../../../util/util_functions";
import type { ProjectPostPositionDTO } from "../../../../dtos/models_dtos/project_post_position_dto";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import joinRequestService from "../../../../service/join_request_service";
import { JoinRequestDTO } from "../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import type { JwtUser } from "../../../../redux/AuthSlice";


interface PostCardPositionCardProps {
    postPosition: ProjectPostPositionDTO;
    postId: number
    user: JwtUser | null;
}


export function PostCardPositionCard({ postPosition, postId, user }: PostCardPositionCardProps) {

    const { position } = postPosition;

    const [applied, setApplied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const handleRequestToJoin = (projectPostPositionId: number) => {

        if (user) {

            const joinRequest = new JoinRequestDTO(user.id!, projectPostPositionId, postId);
           
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

    useEffect(() => {
        joinRequestService.hasAppliedToPostPosition(postId, postPosition.id)
            .then(res => {
                setApplied(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    return (
        <div className="flex justify-between items-center w-full">
            <p className="inline-flex items-center gap-2 dark:text-sky-300">
                <BiGroup size={20} />
                {toTitleCase(position)}
            </p>
            <button
                disabled={loading}
                onClick={() => handleRequestToJoin(postPosition.id)}
                className={`disabled:cursor-not-allowed disabled:opacity-50 text-sm text-white cursor-pointer transition-colors px-2 py-1 rounded-lg
                                ${applied ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}
                                `}>
                {applied ? <BiCheck size={20} /> : 'Request To Join'}
            </button>
        </div>
    )
}