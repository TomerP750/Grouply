import axios from "axios";
import type { CreateDMRequest } from "../components/layout/message-box/model/create.dm.request";
import { BASE_API } from "../util/base_api";


class DirectMessageService {


    async roomMessages(roomId: number, page = 0, size = 50) {
        return (
            await axios.get(`${BASE_API}/dm/${roomId}/messages`, {
                params: { page, size },
            })
        ).data
    }

    async sendMessage(roomId: number, payload: CreateDMRequest) {
        return (
            await axios.post(`${BASE_API}/dm/${roomId}/send`, payload)
        ).data ;
    }


}

const directMessageService = new DirectMessageService();
export default directMessageService;