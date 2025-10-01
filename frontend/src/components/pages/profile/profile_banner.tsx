import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { Avatar } from "../../elements/Avatar";
import defaultBanner from "../../../assets/defaultProfileBanner.jpg";


type ProfileBannerProps = {
  bannerUrl?: string | null;
  avatarSize?: number;
  user: UserDTO
};

export function ProfileBanner({ bannerUrl, avatarSize, user }: ProfileBannerProps) {
  return (
    <div className="relative w-full h-30 sm:h-64">
      {bannerUrl ? (
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      ) : (
        <img src={defaultBanner} className="w-full h-full object-center object-cover" />
      )}

      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
        style={{ width: avatarSize, height: avatarSize }}
      >
        <Avatar
          size={20}
          className="ring-4 ring-white dark:ring-slate-900 rounded-full"
          user={user}
        />
      </div>
    </div>
  );
}
