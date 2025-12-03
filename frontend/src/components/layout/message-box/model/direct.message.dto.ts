// adjust this import path if needed

import type { UserDTO } from "../../../../dtos/models_dtos/user_dto";


export interface DirectMessageDTO {
  id: number;
  roomId: number;
  sender: UserDTO;
  recipient: UserDTO;
  message: string;
  sentAt: string; // Instant -> ISO string
}
