import axios from "axios";
import { BASE_API } from "../utils/base_api";



class StatisticsService {


    async getStats() {
        return (await axios.get(`${BASE_API}/stats/get`)).data
    }

}

const statisticsService = new StatisticsService();
export default statisticsService;