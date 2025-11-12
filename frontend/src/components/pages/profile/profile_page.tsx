import { useEffect, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { NavLink, useParams } from "react-router-dom";
import type { ProfileDTO } from "../../../dtos/models_dtos/profile_dto";
import { useUser } from "../../../redux/hooks";
import profileService from "../../../service/profile_service";
import { Navbar } from "../../layout/navbar/Navbar";
import { ProfileActions } from "./profile_actions";
import { ProfileBanner } from "./profile_banner";
import { ProjectGrid } from "./project_grid";
import { ProfileSocials } from "./profile_socials";
import { Hr } from "../../elements/Hr";


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
    <main className="min-h-screen  dark:text-white">

      <Navbar />

      {/* Banner */}
      {profile && <ProfileBanner user={profile.user} />}



      {/* Page container */}
      <div className="w-full flex justify-end">
        <section className="w-[83%] xl:mt-0  px-4 sm:px-10 ">

          {/* Header  */}
          <div className="flex flex-col lg:flex-row items-start w-full justify-between lg:items-center gap-4 sm:gap-6 md:gap-8 pt-6">

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

          {/* About */}
          <section className="mt-6 sm:mt-10 md:mt-14 pb-10 space-y-2 bg-slate-800/80 p-5 min-h-80">
            <p className="text-lg">About {user.username}</p>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis accusantium optio error
              voluptates, cum autem quibusdam ut molestiae sunt minus ratione itaque unde cupiditate
              dolores enim obcaecati veritatis, commodi ex.
            </p>
          </section>

        </section>
      </div>

      <Hr />

      <ProjectGrid />


    </main>
  );
}
