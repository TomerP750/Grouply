import axios from "axios";
import { BASE_API } from "../../../../../shared/api/baseApi";


class ActivityService {

    async allActivities() {
        return (await axios.get(`${BASE_API}/activity/all`)).data
    }

}

const activityService = new ActivityService();
export default activityService;