import axios from "axios";
import { BASE_API } from "../util/base_api";


class ProjectService {

    async getUserOwnedProjects() {
        return (await axios.get(`${BASE_API}/project/owned`)).data
    }

    async deleteProject(id: number) {
        return (await axios.delete(`${BASE_API}/project/delete/${id}`))
    }

}

const projectService = new ProjectService();
export default projectService;