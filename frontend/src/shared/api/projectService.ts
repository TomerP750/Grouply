import axios from "axios";
import type { CreateProjectDTO } from "../../features/dashboard/shared/models/CreateProjectDto";
import type { UpdateProjectDTO } from "../../features/dashboard/shared/models/UpdateProjectDto";
import { BASE_API } from "./baseApi";



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