import { type IconType } from "react-icons";

type BadgeProps = {
  Icon: IconType;
  size?: number;
  count?: number; 
  className? : string 
};

export function Badge({ Icon, size = 22, count = 0, className }: BadgeProps) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <Icon size={size} />
      {count > 0 && <span
        className={`
          absolute -top-1 -right-1
          h-4 min-w-4 px-1
          rounded-full bg-rose-500
          text-[10px] leading-4 text-white
          text-center font-bold
        `}
      >
        {count >= 10 ? "9+" : count}
      </span>}
    </span>
  );
}
