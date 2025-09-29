import axios from "axios";
import { BASE_API } from "../util/base_api";


class ArchivedProjectService {


    async toggleArhiveProject(postId: number) {
        return (await axios.post(`${BASE_API}/archived/toggle/${postId}`)).data
    }

}

const archivedProjectService = new ArchivedProjectService();
export default archivedProjectService;