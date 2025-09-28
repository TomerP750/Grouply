import axios from "axios";
import type { JoinRequestDTO } from "../dtos/models_dtos/request_dto/JoinRequestDTO";
import { BASE_API } from "../util/base_api";




class JoinRequestService {

    async createJoinRequest(data: JoinRequestDTO) {
        return (await axios.post(`${BASE_API}/join/request`, data))
    }

}

const joinRequestService = new JoinRequestService();
export default joinRequestService;