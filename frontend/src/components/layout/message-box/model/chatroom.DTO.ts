import type { ChatMemberDTO } from "./chatmember.DTO";

export interface ChatRoomDTO {

  id: number;              
  name: string;           
  projectId: number;      
  members: ChatMemberDTO[]; 
  
}
