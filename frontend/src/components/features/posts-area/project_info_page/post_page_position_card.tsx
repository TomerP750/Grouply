import { useEffect, useState } from "react";
import type { ProjectPostPositionDTO } from "../../../../dtos/models_dtos/project_post_position_dto";
import joinRequestService from "../../../../service/join_request_service";
import { useUser } from "../../../../redux/hooks";
import { JoinRequestDTO } from "../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { toast } from "react-toastify";
import { BiCheck, BiLoaderAlt } from "react-icons/bi";
import projectMemberService from "../../../../service/project_member_service";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";

interface PostPositionPageCardProps {
    postPosition: ProjectPostPositionDTO
    post: PostDTO
    onApply?: () => void;
}

export function PostPositionPageCard({ postPosition, post }: PostPositionPageCardProps) {

    const user = useUser();
    const [applied, setApplied] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);


    useEffect(() => {
        projectMemberService.isMember(user.sub, post.projectDTO.id)
        .then(res => {
            setIsMember(res);
        })
        .catch(err => {
            toast.error(err.response.data);
        })
    }, []);

    useEffect(() => {
        setLoading(true)
        joinRequestService.hasAppliedToPostPosition(post.id, postPosition.id)
            .then(res => {
                setApplied(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                setLoading(false);
            })

    }, []);



    const handleRequestToJoin = () => {

        if (user) {

            const joinRequest = new JoinRequestDTO(user.sub, postPosition.id, post.id);
            

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
        <div className="w-full  py-1 cursor-pointer flex items-center justify-between px-3">
            <span className="dark:text-sky-400 font-medium text-sm md:text-base">{postPosition.position}</span>
            <button
                disabled={loading || isMember}
                onClick={handleRequestToJoin}
                className={`py-1 px-2 ${applied ? 'bg-green-600' : 'bg-blue-600'} rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}>
                {loading ? <BiLoaderAlt size={20}/> : applied ? <BiCheck /> : <span className="text-white text-sm md:text-base">Request to Join</span>}
            </button>
        </div>
    )
}