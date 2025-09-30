import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { CreateProjectPostDTO } from "../dtos/models_dtos/request_dto/CreateProjectPostDTO";


class ProjectPostService {

    async allPosts(page = 0, size = 10) {
        return (await axios.get(`${BASE_API}/projPost/all?page=${page}&size=${size}`)).data
    }

    async createPost(data: CreateProjectPostDTO) {
        return (await axios.post(`${BASE_API}/projPost/create`, data))
    }

}

const projectPostService = new ProjectPostService();
export default projectPostService;