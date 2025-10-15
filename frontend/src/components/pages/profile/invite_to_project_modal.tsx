import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { toast } from "react-toastify";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import projectService from "../../../service/ProjectService";
import { Modal } from "../../elements/Modal";
import { InviteProjectList } from "./invite_project_list";
import { InviteToProjectProvider } from "../../../context/invite_to_project_context";

interface InviteToProjectModalProps {
    open: boolean;
    onClose: () => void;
    recipientId: number;
}

export function InviteToProjectModal({ open, onClose, recipientId }: InviteToProjectModalProps) {

    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [query, setQuery] = useState("");


    useEffect(() => {
        if (!open) return;
        projectService
            .getAllUserOwnedProjects()
            .then((res) => {
                setProjects(res);
            })
            .catch((err) => toast.error(err?.response?.data ?? "Failed to load projects"));
    }, [open]);


    return (
        <InviteToProjectProvider initRecipientId={recipientId}>
            
            <Modal open={open} onClose={onClose}>
                <div className="">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Invite to Project</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Choose a project you own and set the position for the invite.
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search projects..."
                            className="w-3/4 lg:w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>

                    {/* List */}
                    <InviteProjectList projects={projects} />

                    {/* Footer */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="mr-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                        >
                            Close
                        </button>
                    </div>

                </div>
            </Modal>

        </InviteToProjectProvider>
    );
}
