import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { CreateProjectDTO } from "../dtos/models_dtos/request_dto/create_project_dto";


class ProjectService {

    async getUserOwnedProjectsPagination(pageIndex: number, size: number ) {
        return (await axios.get(`${BASE_API}/project/owned?pageIndex=${pageIndex}&size=${size}`)).data
    }

    async getAllUserOwnedProjects() {
        return (await axios.get(`${BASE_API}/project/owned/all`)).data
    }

    async createProject(data: CreateProjectDTO) {
        return (await axios.post(`${BASE_API}/project/create`, data))
    }

    async deleteProject(id: number) {
        return (await axios.delete(`${BASE_API}/project/delete/${id}`))
    }

    async allUserProjectsWithNoPosts() {
        return (await axios.get(`${BASE_API}/project/owned/noPost`)).data
    }

}

const projectService = new ProjectService();
export default projectService;