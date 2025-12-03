import type { ChatMessageStatus } from "./chat.message.status";
import type { ChatMemberDTO } from "./chatmember.DTO";


export interface ChatMessageDTO {
  id: number;
  content: string;
  status: ChatMessageStatus;
  sentAt: string;        
  sender: ChatMemberDTO;
  chatRoomId: number;
}