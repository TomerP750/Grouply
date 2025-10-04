
import { useState, useContext, createContext, type ReactNode } from "react";
import type { ProjectPostDTO } from "../dtos/models_dtos/PostDTO";


type ProjectCardState = {
    open: boolean
    archived: boolean
    sentRequest: boolean
    projectPost: ProjectPostDTO
}

type ProjectCardContextValues = ProjectCardState & {
    onClose: () => void
    // onRequestToJoin: () => void;
    // onArchiveClick: () => void;
    // setOpen: (v: boolean) => void;
    // setArchived: (v: boolean) => void;
    // setSentRequest: (v: boolean) => void;
}

const ProjectCardContext = createContext<ProjectCardContextValues | undefined>(undefined);

interface ProjectCardProviderProps {
    children: ReactNode;
    projectPost: ProjectPostDTO
}

export function ProjectCardProvider({ children, projectPost }: ProjectCardProviderProps) {

    const [open, setOpen] = useState<boolean>(false);
    const [archived, setArchived] = useState<boolean>(false);
    const [sentRequest, setSentRequest] = useState<boolean>(false);

    const onClose = () => {
        setOpen(false);
    }

    const ctx = {open,archived,sentRequest, onClose, projectPost}
    return (
        <ProjectCardContext.Provider value={ctx}>
            {children}
        </ProjectCardContext.Provider>
    )
}

export function useProjectCard() {
    const ctx = useContext(ProjectCardContext);
    if (!ctx) {
        throw new Error("project card ctx error");
    }
    return ctx;
}
