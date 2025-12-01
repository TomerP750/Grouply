import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast } from "react-toastify";

import { EditProfileModal } from "./edit_profile_modal";
import { FaPencil } from "react-icons/fa6";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";
import type { JwtUser } from "../../../../redux/AuthSlice";
import connectionRequestService from "../../../../service/connection_request_service";
import connectionService from "../../../../service/connection_service";
import { useThrottleClick } from "../../../../util/helper_hooks";
import { InviteToProjectModal } from "./invite_to_project_modal";


const baseBtn =
  "cursor-pointer inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium " +
  "border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 " +
  "backdrop-blur-md shadow-sm transition-all duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-teal-400/40 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const primaryBtn =
  baseBtn +
  " dark:text-white " +
  "ring-0";

const dangerBtn =
  baseBtn +
  " text-white border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 " +
  "focus:ring-rose-400/40";

const subtleBtn =
  baseBtn + " text-slate-200 hover:text-white";




interface ProfileActionsProps {
    profile: ProfileDTO
    user: JwtUser
    areConnected?: boolean

}


export function ProfileActions({ profile, user }: ProfileActionsProps) {
    const { run: throttleConnect, cooling: coolingConnect } = useThrottleClick(5000);
    const { run: throttleRemove, cooling: coolingRemove } = useThrottleClick(5000);

    const [areConnected, setAreConnected] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const targetId = profile?.user?.id;
        if (!targetId) return;
        connectionService
            .areConnected(targetId)
            .then(setAreConnected)
            .catch((err) => toast.error(err?.response?.data ?? "Failed to check connection"));
    }, [profile?.user?.id]);

    
    const handleConnectRequest = () => {

        throttleConnect(() => {
            const targetId = profile?.user?.id;
            if (!targetId) return;
            connectionRequestService
                .toggleRequest(targetId)
                .then((res) => {
                    setSentRequest(res);
                    toast.success(res ? "Connect Request Sent!" : "Connect Request Canceled");
                })
                .catch((err) => toast.error(err?.response?.data ?? "Action failed"));
        })

    };

    const handleRemoveConnection = () => {

        throttleRemove(() => {
            const targetId = profile?.user.id;
            if (!targetId) return;
            connectionService.removeConnection(targetId)
                .then(res => {
                    setAreConnected(res);
                    toast.success("Removed connection");
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        })
    }

    return (
        <div className="flex flex-wrap items-center justify-end gap-3">
            {user.id !== profile?.user.id ? (
                <>
                    {areConnected ? (
                        <button onClick={handleRemoveConnection} disabled={coolingRemove} className={dangerBtn}>
                            <FaLink size={16} />
                            Remove
                        </button>
                    ) : (
                        <button onClick={handleConnectRequest} disabled={coolingConnect} className={primaryBtn}>
                            <FaLink size={16} />
                            {sentRequest ? "Cancel" : "Connect"}
                        </button>
                    )}

                    <button className={subtleBtn}>
                        <MdMail size={18} />
                        Message
                    </button>

                    <button onClick={() => setModalOpen(true)} className={subtleBtn}>
                        <MdMail size={18} />
                        Invite To Project
                    </button>

                    {modalOpen && <InviteToProjectModal recipientId={profile.user.id} open={modalOpen} onClose={() => setModalOpen(false)} />}
                </>
            ) : (
                <button onClick={() => setModalOpen(true)} className={primaryBtn}>
                    <FaPencil size={16} />
                    Edit Profile
                </button>
            )}

            {modalOpen && <EditProfileModal profile={profile} open={modalOpen} onClose={() => setModalOpen(false)}/>}
        </div>
    )
}