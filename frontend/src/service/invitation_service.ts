import axios from "axios";
import { BASE_API } from "../util/base_api";
import type { InviteUserToProjectRequestDTO } from "../components/pages/profile/invite_project_card";
import type { ProjectPosition } from "../dtos/enums/ProjectPosition";



class InvitationService {

    async toggleInvite(data: InviteUserToProjectRequestDTO) {
        return (await axios.post(`${BASE_API}/invite/toggle`, data)).data
    }

    async existsInvitation(recipientId: number, projectId: number, position: ProjectPosition) {
        return (await axios.get(`${BASE_API}/invite/exists/${recipientId}?projectId=${projectId}&position=${position}`)).data
    }

    
    

}

const invitationService = new InvitationService();
export default invitationService;