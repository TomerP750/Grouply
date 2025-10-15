import axios from "axios";
import { BASE_API } from "../util/base_api";



class InvitationService {

    async allProjectsToInvite(recipientId: number) {
        return (await axios.get(`${BASE_API}/invite/all/${recipientId}`)).data
    }

    

}

const invitationService = new InvitationService();
export default invitationService;