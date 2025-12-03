import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { DirectMessageDTO } from "../components/layout/message-box/model/direct.message.dto";
import type { CreateDMRequest } from "../components/layout/message-box/model/create.dm.request";


class DirectMessageService {

    async listRooms() {
        return (await axios.get(`${BASE_API}/dm/rooms`)).data;
    }

    async getOrCreateRoom(otherUserId: number) {
        return (await axios.post(`${BASE_API}/dm/rooms/${otherUserId}`)).data;
    }

    async listMessages(roomId: number, page = 0, size = 50) {
        return (
            await axios.get(`${BASE_API}/dm/rooms/${roomId}/messages`, {
                params: { page, size },
            })
        ).data as {
            content: DirectMessageDTO[];
            totalElements: number;
            totalPages: number;
            number: number;
        };
    }

    async sendMessage(roomId: number, payload: CreateDMRequest) {
        return (
            await axios.post(`${BASE_API}/dm/rooms/${roomId}/messages`, payload)
        ).data ;
    }


}

const directMessageService = new DirectMessageService();
export default directMessageService;