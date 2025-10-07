import axios from "axios";
import { BASE_API } from "../util/base_api";



class ConnectionService {


    async areConnected(visitedId: number) {
        return (await axios.get(`${BASE_API}/connection/check/${visitedId}`)).data;
    }


}

const connectionService = new ConnectionService();
export default connectionService;