import axios from "axios";
import { BASE_API } from "../util/base_api";



class ConnectionService {


    async areConnected(visitedId: number) {
        return (await axios.get(`${BASE_API}/connection/check/${visitedId}`)).data;
    }

    async removeConnection(removedUserId: number) {
        return (await axios.delete(`${BASE_API}/connection/remove/${removedUserId}`)).data;
    }

    async allConnections() {
        return (await axios.get(`${BASE_API}/connection/all`)).data;
    }

}

const connectionService = new ConnectionService();
export default connectionService;