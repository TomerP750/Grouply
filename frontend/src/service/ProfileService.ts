import axios from "axios";
import type { EditProfileRequestDTO } from "../components/pages/profile/edit_profile_modal";


const BASE_API = "http://localhost:8080/api/profile";

class ProfileService {

    async getOneProfile(userId: number) {
        return (await axios.get(`${BASE_API}/${userId}`)).data
    }

    async updateProfile(data: EditProfileRequestDTO) {
        return (await axios.put(`${BASE_API}/update`, data))
    }

}

const profileService = new ProfileService();
export default profileService;