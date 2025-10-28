import { useEffect, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { NavLink, useParams } from "react-router-dom";
import type { ProfileDTO } from "../../../dtos/models_dtos/ProfileDTO";
import { useUser } from "../../../redux/hooks";
import profileService from "../../../service/ProfileService";
import { Navbar } from "../../layout/navbar/Navbar";
import { ProfileActions } from "./profile_actions";
import { ProfileBanner } from "./profile_banner";



export function ProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const [profile, setProfile] = useState<ProfileDTO>();

  const user = useUser();


  useEffect(() => {
    if (!id) return;
    profileService
      .getOneProfile(id)
      .then(setProfile)
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-200 dark:bg-slate-900 dark:text-white">
      <Navbar />

      {/* Banner */}
      {profile && <ProfileBanner user={profile.user} />}

      <div className="flex">
        <section className="w-80 aspect-square mt-30 flex flex-col items-center text-sm gap-3">

          <button className="font-medium mb-3 cursor-pointer">2 Connections</button>


          <NavLink to={"/"} className={"hover:bg-white hover:text-black transition-colors duration-200 border px-3 w-1/2 py-2 inline-flex justify-center gap-2 items-center"}>
            <FaLinkedin size={22} />
            <span>LinkedIn</span>
          </NavLink>

          <NavLink to={"/"} className={"border px-3 w-1/2 py-2 inline-flex justify-center gap-2 items-center hover:bg-white hover:text-black transition-colors duration-200"}>
            <FaGithub size={22} />
            <span>GitHub</span>
          </NavLink>

          <NavLink to={"/"} className={"border px-3 w-1/2 py-2 inline-flex justify-center gap-2 items-center hover:bg-white hover:text-black transition-colors duration-200"}>
            <FaLink size={22} />
            <span>Portfolio</span>
          </NavLink>

        </section>

        {/* Page container */}
        <div className="flex-1 xl:mt-0 mx-auto px-4 sm:px-10 min-h-screen">

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
            <ProfileActions profile={profile!} user={user} />
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
      </div>
    </main>
  );
}
