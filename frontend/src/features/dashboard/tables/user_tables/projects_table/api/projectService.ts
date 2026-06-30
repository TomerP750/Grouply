import axios from "axios";
import { BASE_API } from "../../../../../../shared/api/baseApi";
import type { CreateProjectDTO } from "../models/CreateProjectDto";
import type { UpdateProjectDTO } from "../models/UpdateProjectDto";


class ProjectService {

    async getUserOwnedProjectsPagination(pageIndex: number, size: number) {
        return (await axios.get(`${BASE_API}/project/owned?pageIndex=${pageIndex}&size=${size}`)).data
    }

    async getAllUserOwnedProjects() {
        return (await axios.get(`${BASE_API}/project/owned/all`)).data
    }

    async createProject(data: CreateProjectDTO) {
        return (await axios.post(`${BASE_API}/project/create`, data))
    }

    async updateProject(data: UpdateProjectDTO) {
        return (await axios.put(`${BASE_API}/project/update`, data))
    }

    async deleteProject(id: number) {
        return (await axios.delete(`${BASE_API}/project/delete/${id}`))
    }

    async allUserProjectsWithNoPosts() {
        return (await axios.get(`${BASE_API}/project/owned/noPost`)).data
    }

    async allUserOwnedFinishedProjects() {
        return (await axios.get(`${BASE_API}/project/owned/completed`)).data
    }

   

}

const projectService = new ProjectService();
export default projectService;