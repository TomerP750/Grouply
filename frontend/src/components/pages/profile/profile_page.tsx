import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { MdMail } from "react-icons/md";
import { useParams } from "react-router-dom";
import type { ProfileDTO } from "../../../dtos/models_dtos/ProfileDTO";
import { useUser } from "../../../redux/hooks";
import profileService from "../../../service/ProfileService";
import { Navbar } from "../../layout/navbar/Navbar";
import { ProfileBanner } from "./profile_banner";
import connectionService from "../../../service/connection_service";
import { toast } from "react-toastify";
import connectionRequestService from "../../../service/connection_request_service";
import { useThrottleClick } from "../../../util/helper_hooks";
import { InviteToProjectModal } from "./invite_to_project_modal";


const baseBtn =
  "cursor-pointer inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium " +
  "border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 " +
  "backdrop-blur-md shadow-sm transition-all duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-teal-400/40 " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

const primaryBtn =
  baseBtn +
  " text-white " +
  "ring-0";

const dangerBtn =
  baseBtn +
  " text-white border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 " +
  "focus:ring-rose-400/40";

const subtleBtn =
  baseBtn + " text-slate-200 hover:text-white";

export function ProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const { run: throttleConnect, cooling: coolingConnect } = useThrottleClick(5000);
  const { run: throttleRemove, cooling: coolingRemove } = useThrottleClick(5000);

  const [profile, setProfile] = useState<ProfileDTO>();
  const [areConnected, setAreConnected] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const user = useUser();

  
  useEffect(() => {
    if (!id) return;
    profileService
      .getOneProfile(id)
      .then(setProfile)
      .catch((err) => console.log(err));
  }, [id]);

  
  useEffect(() => {
    const targetId = profile?.user?.id;
    if (!targetId) return;
    connectionService
      .areConnected(targetId)
      .then(setAreConnected)
      .catch((err) => toast.error(err?.response?.data ?? "Failed to check connection"));
  }, [profile?.user?.id]);

// To disabled the button for 5 seconds
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
    <main className="min-h-screen bg-gray-200 dark:bg-slate-900 dark:text-white">
      <Navbar />

      {/* Banner */}
      {profile && <ProfileBanner user={profile.user} />}

      {/* Page container */}
      <div className="w-full lg:max-w-7xl mt-10 lg:mt-0 ml-auto px-4 sm:px-6 min-h-screen">

        {/* Header  */}
        <div className="flex w-full justify-between items-center gap-4 sm:gap-6 md:gap-8 pt-6">

          {/* Name/handle */}
          <div>
            <p className="font-semibold text-2xl sm:text-3xl leading-tight max-w-1/2">
              {profile?.user.firstName} {profile?.user.lastName}
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base">@{profile?.user.username}</p>
          </div>

          {/* Actions */}
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

                {modalOpen && <InviteToProjectModal recipientId={id} open={modalOpen} onClose={() => setModalOpen(false)}/>}
              </>
            ) : (
              <button className={primaryBtn}>
                <FaLink size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* content */}
        <section className="mt-6 sm:mt-10 md:mt-14">
          <p className="text-base sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusantium optio error
            voluptates, cum autem quibusdam ut molestiae sunt minus ratione itaque unde cupiditate
            dolores enim obcaecati veritatis, commodi ex.
          </p>
        </section>


      </div>
    </main>
  );
}
