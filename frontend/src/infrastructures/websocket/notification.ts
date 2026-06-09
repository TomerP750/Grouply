import type { NotificationType } from "./notification_type";

export interface Notification {
  type: NotificationType;
  fromUserId: number;
  fromUsername: string;
  message: string;
  createdAt: number; 
}