import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { ProjectRole } from "../dtos/enums/ProjectRole";


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

    async changeMemberRole(data: undefined) {
        return (await axios.get(`${BASE_API}/member/changeRole`))
    }

}

const projectMemberService = new ProjectMemberService();
export default projectMemberService;