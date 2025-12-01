import { useEffect, useMemo, useState } from "react";
import { FaLink } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast } from "react-toastify";
import throttle from "lodash/throttle";
import { EditProfileModal } from "./edit_profile_modal";
import { FaPencil } from "react-icons/fa6";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";
import type { JwtUser } from "../../../../redux/AuthSlice";
import connectionRequestService from "../../../../service/connection_request_service";
import connectionService from "../../../../service/connection_service";
import { useThrottleClick } from "../../../../util/helper_hooks";
import { InviteToProjectModal } from "./invite_to_project_modal";


const buttonStyle = `
  inline-flex items-center gap-2
  px-4 py-3 rounded-xl text-sm font-medium
  
  text-slate-900 dark:text-white
  bg-slate-900/10 dark:bg-white/10
  border border-slate-900/20 dark:border-white/20

  hover:bg-slate-900/15 dark:hover:bg-white/15
  active:bg-slate-900/20 dark:active:bg-white/20

  backdrop-blur-md shadow-sm transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-teal-400/40
  disabled:opacity-60 disabled:cursor-not-allowed
`;




interface ProfileActionsProps {
    profile: ProfileDTO
    user: JwtUser
    areConnected?: boolean

}

export function ProfileActions({ profile, user }: ProfileActionsProps) {

    const [areConnected, setAreConnected] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [inviteMenuOpen, setInviteMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const targetId = profile?.user?.id;
        if (!targetId) return;
        connectionService
            .areConnected(targetId)
            .then(setAreConnected)
            .catch((err) => toast.error(err.response.data));
    }, [profile?.user?.id]);


    const throttleConnect = useMemo(
        () =>
            throttle((targetId: number) => {
                connectionRequestService
                    .toggleRequest(targetId)
                    .then((res) => {
                        setSentRequest(res);
                        toast.success(res ? "Connect Request Sent!" : "Connect Request Canceled");
                    })
                    .catch((err) => toast.error(err?.response?.data ?? "Action failed"));
            }, 5000),
        []
    );


    const handleConnectRequest = () => {

        const targetId = profile?.user?.id;
        if (!targetId) return;

        throttleConnect(targetId);

    };

    useEffect(() => {
        return () => throttleConnect.cancel();
    }, [throttleConnect]);


    const throttleRemove = useMemo(
        () =>
            throttle((targetId: number) => {
                connectionService
                    .removeConnection(targetId)
                    .then((res) => {
                        setAreConnected(res);
                        toast.success("Removed connection");
                    })
                    .catch((err) => {
                        toast.error(err?.response?.data ?? "Action failed");
                    });
            }, 5000), 
        []
    );


    const handleRemoveConnection = () => {

        const targetId = profile?.user?.id;
        if (!targetId) return;

        throttleRemove(targetId);
    }

    useEffect(() => {
        return () => throttleRemove.cancel();
    }, [throttleRemove]);


    return (
        <div className="flex flex-wrap items-center justify-end gap-3">
            {user.id !== profile?.user.id ? (
                <>
                    {areConnected ? (
                        <button onClick={handleRemoveConnection} className={buttonStyle}>
                            <FaLink size={16} />
                            Remove
                        </button>
                    ) : (
                        <button onClick={handleConnectRequest} className={buttonStyle}>
                            <FaLink size={16} />
                            {sentRequest ? "Cancel" : "Connect"}
                        </button>
                    )}

                    <button className={buttonStyle}>
                        <MdMail size={18} />
                        Message
                    </button>

                    <button onClick={() => setInviteMenuOpen(true)} className={buttonStyle}>
                        <MdMail size={18} />
                        Invite To Project
                    </button>

                    {modalOpen && <InviteToProjectModal recipientId={profile.user.id} open={modalOpen} onClose={() => setModalOpen(false)} />}
                </>
            ) : (
                <button onClick={() => setModalOpen(true)} className={buttonStyle}>
                    <FaPencil size={16} />
                    Edit Profile
                </button>
            )}

            {modalOpen && <EditProfileModal profile={profile} open={modalOpen} onClose={() => setModalOpen(false)} />}
        </div>
    )
}