import type { ProjectPostDTO } from "../../../../dtos/models_dtos/ProjectPostDTO"
import { Modal } from "../../../elements/Modal"


interface ReadMoreModalProps {
    onClose: () => void 
    open: boolean
    projectPost: ProjectPostDTO
}

export function ReadMoreModal({onClose, open, projectPost}: ReadMoreModalProps) {

    const { title, description, projectDTO } = projectPost;

    return (
        <Modal onClose={onClose} open={open}>
            
            <h1>{title}</h1>
            <p>{description}</p>

        </Modal>
    )
}