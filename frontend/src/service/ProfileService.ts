import axios from "axios";


const BASE_API = "http://localhost:8080/api/profile";

class ProfileService {

    async getOneProfile(userId: number) {
        return (await axios.get(`${BASE_API}/${userId}`)).data
    }

}

const profileService = new ProfileService();
export default profileService;