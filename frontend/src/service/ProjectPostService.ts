import axios from "axios";
import { BASE_API } from "../util/base_api";


class ProjectPostService {

    async allPosts(page = 0, size = 10) {
        return (await axios.get(`${BASE_API}/projPost/all?page=${page}&size=${size}`)).data
    }

}

const projectPostService = new ProjectPostService();
export default projectPostService;