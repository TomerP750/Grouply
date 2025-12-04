import type { UserDTO } from "../../../dtos/models_dtos/user_dto";

export interface DirectMessageRoomDTO {
  id: number;
  sender: UserDTO;
  recipient: UserDTO;
  createdAt: Date
}
