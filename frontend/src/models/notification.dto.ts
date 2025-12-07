import type { NotificationType } from "./notification.type";


export interface NotificationDTO {
  type: NotificationType;
  targetUserId: number;
  actorUsername: string;
  actorAvatarUrl: string;
  message: string;
}