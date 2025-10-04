import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO"
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/PostDTO"
import { Avatar } from "../../../elements/Avatar"
import { Modal } from "../../../elements/Modal"
import { ProjectCardDescription } from "./project_card_description"


interface ReadMoreModalProps {
    onClose: () => void
    open: boolean
    projectPost: ProjectPostDTO
    members: ProjectMemberDTO[]
    loading: boolean
    archived: boolean
    sentRequest: boolean
    onRequestToJoin: () => void;
    onArchiveClick: () => void;
}

export function ReadMoreModal({ onClose, open, projectPost, members, archived, loading, sentRequest, onArchiveClick, onRequestToJoin }: ReadMoreModalProps) {

    return (
        <Modal onClose={onClose} open={open}>
            <div className="flex h-full flex-col items-start">

                <ProjectCardDescription
                    loading={loading}
                    archived={archived}
                    sentRequest={sentRequest}
                    onRequestToJoin={onRequestToJoin}
                    onArchiveClick={onArchiveClick}
                    projectPost={projectPost}
                    inReadMore={true}
                />

                <div className="flex mt-auto -space-x-2 items-center cursor-pointer">
                    {members.slice(0, 8).map(m => {
                        return <Avatar size={30} key={m.id} />
                    })}

                    {members.length > 5 && <span className="ml-2.5">+{members.length - 5}</span>}
                </div>
            </div>

        </Modal>
    )
}