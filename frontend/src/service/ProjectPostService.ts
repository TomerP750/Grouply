import axios from "axios";
import { BASE_API } from "../util/base_api";


class ProjectPostService {

    async allPosts() {
        return (await axios.get(`${BASE_API}/projPost/all`)).data
    }

}

const projectPostService = new ProjectPostService();
export default projectPostService;