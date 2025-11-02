import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { ProjectRole } from "../dtos/enums/ProjectRole";
import type { ChangeUserRoleDTO } from "../components/pages/dashboard/tables/project_members_table";


class ProjectMemberService {

    async allMembers(id: number) {
        return (await axios.get(`${BASE_API}/member/all/${id}`)).data
    }

    async allMembersPagination(id: number, page: number, size: number) {
        return (await axios.get(`${BASE_API}/member/allPage/${id}?page=${page}&size=${size}`)).data
    }

    async isMember(userId: number, projectId: number) {
        return (await axios.get(`${BASE_API}/member/isMember/${userId}/${projectId}`)).data
    }

    async isOwner(userId: number, projectId: number) {
        return (await axios.get(`${BASE_API}/member/isOwner/${userId}/${projectId}`)).data
    }

    async removeMemberFromProject(memberId: number, projectId: number) {
        return (await axios.delete(`${BASE_API}/member/remove/${memberId}/${projectId}`))
    }

    async changeMemberRole(data: ChangeUserRoleDTO) {
        return (await axios.patch(`${BASE_API}/member/changeRole`, data))
    }

}

const projectMemberService = new ProjectMemberService();
export default projectMemberService;