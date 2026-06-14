import axios from "axios";
import { BASE_API } from "../../../../shared/api/baseApi";
import type { RequestToJoinDTO } from "../models/RequestToJoinDTO";




class JoinRequestService {

    async allRequestsByPostId(id: number, page: number, size: number) {
        return (await axios.get(`${BASE_API}/join/all/${id}?page=${page}&size=${size}`)).data
    }

    async toggleJoinRequest(data: RequestToJoinDTO) {
        return (await axios.post(`${BASE_API}/join/request`, data)).data
    }

    async hasAppliedToPostPosition(postId: number, positionId: number) {
        return (await axios.get(`${BASE_API}/join/applied/${postId}/${positionId}`)).data
    }

    async acceptRequest(joinRequestId: number) {
        return (await axios.post(`${BASE_API}/join/accept/${joinRequestId}`))
    }

    async declineRequest(joinRequestId: number) {
        return (await axios.post(`${BASE_API}/join/decline/${joinRequestId}`))
    }

    

}

const joinRequestService = new JoinRequestService();
export default joinRequestService;