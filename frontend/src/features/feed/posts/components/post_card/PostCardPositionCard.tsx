import { useState, useEffect } from "react";
import { BiGroup, BiCheck } from "react-icons/bi";
import { toast } from "react-toastify";
import type { JwtUser } from "../../../../../shared/store/AuthSlice";
import { toTitleCase } from "../../../../../shared/utils/string_formats";
import type { ProjectPostPositionDTO } from "../../../shared/models/ProjectPostPositionDto";
import joinRequestService from "../../api/joinRequestService";
import type { RequestToJoinDTO } from "../../models/RequestToJoinDTO";


interface PostCardPositionCardProps {
    postPosition: ProjectPostPositionDTO;
    postId: number
    user: JwtUser | null;
}

export function PostCardPositionCard({ postPosition, postId, user }: PostCardPositionCardProps) {

    const { position } = postPosition;

    const [applied, setApplied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    const handleRequestToJoin = (postPositionId: number) => {

        if (user) {

            const joinRequest: RequestToJoinDTO = {
                senderId: user.id!,
                postPositionId: postPositionId,
                postId: postId
            } 
           
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