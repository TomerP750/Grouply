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

const btn =
  "font-medium cursor-pointer text-white inline-flex items-center justify-center gap-2 rounded-lg " +
  "bg-slate-700 hover:bg-slate-600 px-3 py-2  " +
  "text-sm sm:text-base";

export function ProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const [profile, setProfile] = useState<ProfileDTO>();
  const [areConnected, setAreConnected] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);

  const user = useUser();

  // Fetch profile when route param changes
  useEffect(() => {
    if (!id) return;
    profileService
      .getOneProfile(id)
      .then(setProfile)
      .catch((err) => console.log(err));
  }, [id]);

  // Check connection status whenever we know which profile user it is
  useEffect(() => {
    const targetId = profile?.user?.id;
    if (!targetId) return;
    connectionService
      .areConnected(targetId)
      .then(setAreConnected)
      .catch((err) => toast.error(err?.response?.data ?? "Failed to check connection"));
  }, [profile?.user?.id]);

  const handleConnectRequest = () => {
    const targetId = profile?.user?.id;
    if (!targetId) return;
    connectionRequestService
      .toggleRequest(targetId)
      .then((res) => {
        setSentRequest(res);
        toast.success(res ? "Connect Request Sent!" : "Connect Request Canceled");
      })
      .catch((err) => toast.error(err?.response?.data ?? "Action failed"));
  };

  const handleRemoveConnection = () => {
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
          <div className="space-x-3">
            {user.id !== profile?.user.id ? (
              <>
                {areConnected ? (
                  <button onClick={handleRemoveConnection} className={btn}>
                    <FaLink /> Remove
                  </button>
                ) : (
                  <button onClick={handleConnectRequest} className={btn}>
                    <FaLink /> {sentRequest ? "Cancel" : "Connect"}
                  </button>
                )}
                <button className={btn}>
                  <MdMail /> Message
                </button>
                <button className={btn}>
                  <HiUserAdd /> Invite To Project
                </button>
              </>
            ) : (
              <button className={btn}>
                <FaLink /> Edit Profile
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
