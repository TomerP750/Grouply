import axios from "axios";
import type { JoinRequestDTO } from "../dtos/models_dtos/request_dto/JoinRequestDTO";
import { BASE_API } from "../util/base_api";




class JoinRequestService {

    async allRequestsByPostId(id: number, page: number, size: number) {
        return (await axios.get(`${BASE_API}/join/all/${id}?page=${page}&size=${size}`)).data
    }

    async toggleJoinRequest(data: JoinRequestDTO) {
        return (await axios.post(`${BASE_API}/join/request`, data)).data
    }

    async hasAppliedToPostPosition(postId: number, positionId: number) {
        return (await axios.get(`${BASE_API}/join/applied/${postId}/${positionId}`)).data
    }

}

const joinRequestService = new JoinRequestService();
export default joinRequestService;