import axios from "axios";
import type { ProjectPosition } from "../models/project/ProjectPosition";
import type { InviteUserToProjectRequestDTO } from "../../features/profile/components/invite_project_card";
import { BASE_API } from "./baseApi";



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