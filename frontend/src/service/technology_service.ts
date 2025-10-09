import axios from "axios";
import { BASE_API } from "../util/base_api";


class TechnologyService {

    async allTechnologies() {
        return (await axios(`${BASE_API}/tech/all`)).data;
    }

}

const technologyService = new TechnologyService();
export default technologyService;