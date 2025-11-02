import axios from "axios";
import { BASE_API } from "../util/base_api";


class TechnologyService {

    async allTechnologies() {
        return (await axios(`${BASE_API}/tech/all`)).data;
    }

    async allTechnologiesPage(page: number, size: number) {
        return (await axios.get(`${BASE_API}/tech/all/page?page=${page}&size=${size}`)).data
    }

    async deleteTechnology(id: number) {
        return (await axios.delete(`${BASE_API}/tech/delete/${id}`))
    }

}

const technologyService = new TechnologyService();
export default technologyService;