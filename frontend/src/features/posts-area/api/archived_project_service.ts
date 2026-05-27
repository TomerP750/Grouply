import axios from "axios";
import { BASE_API } from "../util/base_api";


class ArchivedPostService {


    async allArchived(page: number, size: number) {
        return (await axios.get(`${BASE_API}/archived/all?page=${page}&size=${size}`)).data
    }

    async toggleArhiveProject(postId: number) {
        return (await axios.post(`${BASE_API}/archived/toggle/${postId}`)).data
    }

    async isPostArchived(postId: number) {
        return (await axios.get(`${BASE_API}/archived/isArchived/${postId}`)).data
    }
}

const archivedPostService = new ArchivedPostService();
export default archivedPostService;