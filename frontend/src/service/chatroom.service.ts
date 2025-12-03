import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { ChatRoomDTO } from "../components/layout/message-box/model/chatroom.DTO";


class ChatRoomService {

    async createRoom(chatRoomDTO: ChatRoomDTO) {
        return (await axios.post(`${BASE_API}/chat-room/create`, chatRoomDTO)).data;
    }

    async getRoom(roomId: number) {
        return (await axios.get(`${BASE_API}/chat-room/${roomId}`)).data;
    }
    


}

const chatRoomService = new ChatRoomService();
export default chatRoomService;