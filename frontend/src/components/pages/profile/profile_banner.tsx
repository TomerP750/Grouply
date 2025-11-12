import type { UserDTO } from "../../../dtos/models_dtos/user_dto";
import { Avatar } from "../../elements/Avatar";
import defaultBanner from "../../../assets/defaultProfileBanner.jpg";
import { ProfileSocials } from "./profile_socials";

type ProfileBannerProps = {
  bannerUrl?: string | null;
  user: UserDTO;
};

export function ProfileBanner({ bannerUrl, user }: ProfileBannerProps) {
  return (
    <div className="w-full z-0">
      {/* Banner */}
      <div className="relative w-full h-48 sm:h-64">
        {bannerUrl ? (
          <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
        ) : (
          <img src={defaultBanner} alt="Banner" className="w-full h-full object-center object-cover" />
        )}

        {/* Avatar */}
        <div className="absolute bottom-0 translate-y-1/2 left-4 sm:left-8 md:left-10 lg:left-14">
          <div
            className="
              w-28 aspect-square
              sm:w-36 
              md:w-44 
              lg:w-52 
              rounded-full overflow-hidden
              ring-4 ring-white dark:ring-slate-900
            "
          >
            <Avatar user={user} className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        <ProfileSocials/>
      </div>
    </div>
  );
}
