import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { Avatar } from "../../elements/Avatar";
import defaultBanner from "../../../assets/defaultProfileBanner.jpg";


type ProfileBannerProps = {
  bannerUrl?: string | null;
  user: UserDTO
};

export function ProfileBanner({ bannerUrl, user }: ProfileBannerProps) {
  return (
    <div className="relative w-full h-30 sm:h-64">
      {bannerUrl ? (
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      ) : (
        <img src={defaultBanner} className="w-full h-full object-center object-cover" />
      )}

      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
      >
        <div
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 
               rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-900"
        >
          <Avatar
            user={user}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
      </div>

    </div>
  );
}
