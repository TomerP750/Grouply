import axios from "axios";
import { BASE_API } from "../util/base_api";


class DirectMessageRoomService {

    async listRooms() {
        return (await axios.get(`${BASE_API}/dm/rooms/all`)).data ;
    }

    async getOrCreateRoom(recipientUserId: number) {
        return (await axios.post(`${BASE_API}/dm/rooms/${recipientUserId}`)).data;
    }

}

const directMessageRoomService = new DirectMessageRoomService();
export default directMessageRoomService;