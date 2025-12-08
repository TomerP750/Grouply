import { useEffect, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { NavLink, useParams } from "react-router-dom";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";
import { useUser } from "../../../../redux/hooks";
import profileService from "../../../../service/profile_service";
import { Navbar } from "../../../layout/navbar/Navbar";

import { Hr } from "../../../elements/Hr";
import { ProfileActions } from "../components/profile_actions";
import { ProfileBanner } from "../components/profile_banner";
import { ProjectGrid } from "../components/project_grid";
import { DmProvider } from "../../../../context/Dm_context";
import { ProfileSocials } from "../components/profile_socials";






export function ProfilePage() {

  const params = useParams();
  const id = Number(params.id);

  const [profile, setProfile] = useState<ProfileDTO>();

  const user = useUser();

  useEffect(() => {
    if (!id) return;
    profileService
      .getOneProfile(id)
      .then(res => {
        console.log(res);

        setProfile(res)
      })
      .catch((err) => console.log(err));
  }, [id]);



  return (

    <main className="min-h-screen dark:text-white bg-neutral-100 dark:bg-slate-950">

      <Navbar />

      {/* Banner */}
      {profile && <ProfileBanner user={profile.user} />}

      {/* Page container */}
      <div className="w-full flex justify-center">

        <section className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Header  */}
          <div className="flex flex-col items-center gap-4 sm:gap-5 pt-24 sm:pt-28 md:pt-32">
            {/* Name / handle / connections */}
            <div className="text-center space-y-1.5">
              <p className="font-semibold text-2xl sm:text-3xl leading-tight">
                {profile?.user.firstName} {profile?.user.lastName}
              </p>

              <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base">
                @{profile?.user.username}
              </p>

              <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                2 Connections
              </p>
            </div>

            {/* Socials */}
            {profile && <ProfileSocials profile={profile} />}

            {/* Actions */}
            <ProfileActions profile={profile!} user={user} />
          </div>


          {/* About */}
          <section className="mt-6 sm:mt-10 md:mt-14">
            <div className="max-w-3xl mx-auto rounded-2xl border
      bg-white/95 border-slate-200 shadow-sm
      dark:bg-slate-900/85 dark:border-slate-800
      px-5 sm:px-7 py-5 sm:py-6
      space-y-3
    "
            >
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50">
                About @{profile?.user.username}
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                accusantium optio error voluptates, cum autem quibusdam ut molestiae
                sunt minus ratione itaque unde cupiditate dolores enim obcaecati
                veritatis, commodi ex.
              </p>
            </div>
          </section>


        </section>


      </div>


      <Hr />

      <ProjectGrid />


    </main>

  );
}
