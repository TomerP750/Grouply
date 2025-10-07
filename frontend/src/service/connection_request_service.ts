import axios from "axios";
import { BASE_API } from "../util/base_api";


const CONNECTION_BASE_URL = `${BASE_API}/connection-request`; 

class ConnectionRequestService {


    async toggleRequest(recipientId: number) {
        return (await axios.post(`${CONNECTION_BASE_URL}/toggle/${recipientId}`)).data;
    };

    async acceptRequest(senderId: number) {
        return (await axios.post(`${CONNECTION_BASE_URL}/accept/${senderId}`));
    };

    async declineRequest(senderId: number) {
        return (await axios.post(`${CONNECTION_BASE_URL}/decline/${senderId}`));
    };



}

const connectionRequestService = new ConnectionRequestService();
export default connectionRequestService;