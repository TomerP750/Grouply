import throttle from "lodash/throttle";
import { useEffect, useMemo, useState } from "react";
import { FaLink } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { toast } from "react-toastify";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";
import type { JwtUser } from "../../../../redux/AuthSlice";
import connectionRequestService from "../../../../service/connection_request_service";
import connectionService from "../../../../service/connection_service";
import { EditProfileModal } from "./edit_profile_modal";
import { InviteToProjectModal } from "./invite_to_project_modal";
import { useDm } from "../../../../context/Dm_context";
import directMessageRoomService from "../../../../service/direct.message.room.service";



const buttonStyle = [
    "cursor-pointer inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5",
    "text-sm font-medium",

    "bg-sky-600 text-white shadow-sm",
    "hover:bg-sky-500 active:bg-sky-700",

    "dark:bg-sky-600 dark:hover:bg-sky-500 dark:active:bg-sky-600",

    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-sky-400",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
    "disabled:opacity-60 disabled:cursor-not-allowed",
].join(" ");


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

    const { openConversation } = useDm();

    useEffect(() => {
        const targetId = profile?.user?.id;
        if (!targetId) return;
        connectionService
            .areConnected(targetId)
            .then(res => setAreConnected(res))
            .catch((err) => toast.error(err.response.data));
    }, [profile?.user?.id, sentRequest]);


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


    const handleMessage = () => {
        directMessageRoomService.getOrCreateRoom(profile.user.id)
            .then(res => {
                openConversation(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
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

                    <button onClick={handleMessage} className={buttonStyle}>
                        <MdMail size={18} />
                        Message
                    </button>

                    <button onClick={() => setInviteMenuOpen(true)} className={buttonStyle}>
                        <MdMail size={18} />
                        Invite To Project
                    </button>

                    {inviteMenuOpen && (
                        <InviteToProjectModal
                            recipientId={profile.user.id}
                            open={inviteMenuOpen}
                            onClose={() => setInviteMenuOpen(false)}
                        />
                    )}
                </>
            ) : (
                <button onClick={() => setModalOpen(true)} className={buttonStyle}>
                    <FaPencil size={16} />
                    Edit Profile
                </button>
            )}

            {modalOpen && (
                <EditProfileModal
                    profile={profile}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );

}