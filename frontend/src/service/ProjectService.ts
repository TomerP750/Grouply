import axios from "axios";
import { BASE_API } from "../util/base_api";


class ProjectService {

    async getUserOwnedProjects(userId: number) {
        return (await axios.post(`${BASE_API}/project/owned/${userId}`)).data
    }

}

const projectService = new ProjectService();
export default projectService;